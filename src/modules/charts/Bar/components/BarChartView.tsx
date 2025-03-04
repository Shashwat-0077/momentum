"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetDatabaseSchema } from "@/modules/notion/api/client/useGetDatabaseSchema";
import { useGetTableData } from "@/modules/notion/api/client/useGetTableData";

import { ChartViewComponentType } from "../../types";
import { ChartViewWrapperComponent } from "../../components/ChartViewWrapperComponent";
import {
    useBarChartAppearanceStore,
    useBarChartConfigStore,
} from "../state/provider/bar-chart-store-provider";
import { getRadarChartData } from "../../utils/RadarChartDataConversion";

export const BarChartView: ChartViewComponentType = ({
    chartName,
    notion_table_id,
}) => {
    // NOTE : Their are some problems with names, we need to fix it
    // TODO : fix names

    const LIMIT = 8;

    const {
        colors,
        showLegends,
        showGrid,
        showToolTip,
        gridColor,
        labelColor,
        showLabel,
        bgColor,
        barGap,
        barSize,
    } = useBarChartAppearanceStore((state) => state);

    const { xAxis, yAxis } = useBarChartConfigStore((state) => state);

    const { data: schema, isLoading: schemaLoading } =
        useGetDatabaseSchema(notion_table_id);
    const {
        data: tableData,
        error,
        isLoading: dataLoading,
    } = useGetTableData(notion_table_id);

    const { radarChartConfig, radarChartData } = useMemo(() => {
        if (!schema || !tableData?.data || !xAxis || !yAxis) {
            return { radarChartConfig: [], radarChartData: [] };
        }
        return getRadarChartData(tableData.data, schema, xAxis, yAxis);
    }, [schema, tableData, xAxis, yAxis]);

    const limitedRadarChartData = useMemo(() => {
        return radarChartData.length > LIMIT
            ? radarChartData.slice(0, LIMIT)
            : radarChartData;
    }, [radarChartData]);

    if (schemaLoading || dataLoading) {
        return (
            <ChartViewWrapperComponent
                bgColor={bgColor}
                labelColor={labelColor}
                showLabel={showLabel}
                label={chartName}
            >
                Loading...
            </ChartViewWrapperComponent>
        ); // TODO : improve Text and design
    }

    if (error || !schema || !tableData) {
        return (
            <ChartViewWrapperComponent
                bgColor={bgColor}
                labelColor={labelColor}
                showLabel={showLabel}
                label={chartName}
            >
                Error
            </ChartViewWrapperComponent>
        ); // TODO : improve Text and design
    }

    if (!schema) {
        return (
            <ChartViewWrapperComponent
                bgColor={bgColor}
                labelColor={labelColor}
                showLabel={showLabel}
                label={chartName}
            >
                No Data
            </ChartViewWrapperComponent>
        ); // TODO : improve Text and design
    }

    if (!xAxis || !yAxis) {
        return (
            <ChartViewWrapperComponent
                bgColor={bgColor}
                labelColor={labelColor}
                showLabel={showLabel}
                label={chartName}
            >
                Select X and Y Axis
            </ChartViewWrapperComponent>
        ); // TODO : improve Text and design
    }

    const configData: {
        [key: string]: { label: string; color: string; alpha: number };
    } = {};

    for (let idx = 0; idx < radarChartConfig.length; idx++) {
        const data_label = radarChartConfig[idx];
        configData[data_label] = {
            label:
                data_label[0].toUpperCase() + data_label.slice(1).toLowerCase(),
            color: colors[idx]
                ? `rgb(${colors[idx].r}, ${colors[idx].g}, ${colors[idx].b}`
                : "rgb(255, 255, 255)",
            alpha: colors[idx]
                ? colors[idx].a
                : Math.min(1 / radarChartConfig.length, 0.5),
        };
    }

    return (
        <ChartViewWrapperComponent
            bgColor={bgColor}
            labelColor={labelColor}
            showLabel={showLabel}
            label={chartName}
        >
            <ChartContainer
                config={configData}
                className="mx-auto max-h-[500px] min-h-[270px] w-full break1200:min-h-[500px]"
            >
                <BarChart
                    accessibilityLayer
                    data={limitedRadarChartData}
                    width={100}
                    maxBarSize={70}
                    barSize={barSize}
                    barGap={barGap}
                >
                    {showGrid && (
                        <CartesianGrid
                            vertical={false}
                            stroke={`rgba(${gridColor.r}, ${gridColor.g}, ${gridColor.b}, ${gridColor.a})`}
                        />
                    )}
                    {showLegends && (
                        <ChartLegend content={<ChartLegendContent />} />
                    )}
                    <XAxis dataKey="class" tickMargin={10} axisLine={false} />
                    {showToolTip && (
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                    )}

                    {radarChartConfig.map((data_label) => (
                        <Bar
                            key={data_label}
                            dataKey={data_label}
                            fill={configData[data_label].color}
                            fillOpacity={configData[data_label].alpha}
                            stroke={configData[data_label].color}
                            strokeWidth={0.2}
                            radius={10}
                        />
                    ))}
                </BarChart>
            </ChartContainer>
        </ChartViewWrapperComponent>
    );
};
