import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import {
    AreaCharts,
    BarCharts,
    Charts,
    DonutCharts,
    HeatmapCharts,
    RadarCharts,
} from "@/db/schema";

export const ChartType = ["Area", "Bar", "Donut", "Heatmap", "Radar"];

export const ChartsTypesSchema = z
    .string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    })
    .min(1, { message: "Type is required" })
    .max(20, { message: "Type must be at most 20 characters" })
    .refine(
        (value) => {
            return ["Area", "Bar", "Donut", "Heatmap", "Radar"].includes(value);
        },
        {
            message: "Type must be one of Area, Bar, Donut, Heatmap, Radar",
        }
    );

export const BasicChartSchema = {
    Insert: createInsertSchema(Charts, {
        collection_id: z.string({
            required_error: "Collection ID is required",
            invalid_type_error: "Collection ID must be a string",
        }),
        name: z
            .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be a string",
            })
            .min(1, { message: "Name is required" })
            .max(100, { message: "Name must be at most 100 characters" }),
        description: z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string",
            })
            .min(1, { message: "Description is required" })
            .max(500, {
                message: "Description must be at most 500 characters",
            }),
        notion_database_name: z
            .string({
                required_error: "Notion Database Name is required",
                invalid_type_error: "Notion Database Name must be a string",
            })
            .min(1, { message: "Notion Database Name is required" })
            .max(255, {
                message: "Notion Database Name must be at most 255 characters",
            }),
        notion_database_url: z
            .string({
                required_error: "Notion Database URL is required",
                invalid_type_error: "Notion Database URL must be a string",
            })
            .min(1, { message: "Notion Database URL is required" })
            .max(255, {
                message: "Notion Database URL must be at most 255 characters",
            }),
        type: z
            .string({
                required_error: "Type is required",
                invalid_type_error: "Type must be a string",
            })
            .min(1, { message: "Type is required" })
            .max(20, { message: "Type must be at most 20 characters" })
            .refine(
                (value) => {
                    return [
                        "Area",
                        "Bar",
                        "Donut",
                        "Heatmap",
                        "Radar",
                    ].includes(value);
                },
                {
                    message:
                        "Type must be one of Area, Bar, Donut, Heatmap, Radar",
                }
            ),
    }).omit({ chart_id: true, created_at: true, x_axis: true, y_axis: true }),
    Select: createSelectSchema(Charts),
    Update: createUpdateSchema(Charts, {
        name: z
            .string({
                invalid_type_error: "Name must be a string",
            })
            .max(100, { message: "Name must be at most 100 characters" })
            .optional(),
        description: z
            .string({
                invalid_type_error: "Description must be a string",
            })
            .max(500, { message: "Description must be at most 500 characters" })
            .optional(),
        xAxis: z
            .string({
                invalid_type_error: "X Axis must be a string",
            })
            .max(255, { message: "X Axis must be at most 255 characters" })
            .optional(),
        yAxis: z
            .string({
                invalid_type_error: "Y Axis must be a string",
            })
            .max(255, { message: "Y Axis must be at most 255 characters" })
            .optional(),
    }).omit({
        chart_id: true,
        created_at: true,
        type: true,
        collection_id: true,
        notion_database_name: true,
        notion_database_url: true,
    }),
};

export const AreaChartSchema = {
    Insert: createInsertSchema(AreaCharts, {
        chart_id: z
            .string({
                required_error: "Chart ID is required",
                invalid_type_error: "Chart ID must be a string",
            })
            .min(1, { message: "Chart ID is required" })
            .max(255, { message: "Chart ID must be at most 255 characters" }),
    }).omit({ area_id: true }),
    Select: createSelectSchema(AreaCharts),
    Update: createUpdateSchema(AreaCharts, {
        chart_id: z
            .string({
                invalid_type_error: "Chart ID must be a string",
            })
            .optional(),
    }).omit({ area_id: true }),
};

export const BarChartSchema = {
    Insert: createInsertSchema(BarCharts, {
        chart_id: z
            .string({
                required_error: "Chart ID is required",
                invalid_type_error: "Chart ID must be a string",
            })
            .min(1, { message: "Chart ID is required" })
            .max(255, { message: "Chart ID must be at most 255 characters" }),
    }).omit({ bar_id: true }),
    Select: createSelectSchema(BarCharts),
    Update: createUpdateSchema(BarCharts, {
        chart_id: z
            .string({
                invalid_type_error: "Chart ID must be a string",
            })
            .optional(),
    }).omit({ bar_id: true }),
};

export const DonutChartSchema = {
    Insert: createInsertSchema(DonutCharts, {
        chart_id: z
            .string({
                required_error: "Chart ID is required",
                invalid_type_error: "Chart ID must be a string",
            })
            .min(1, { message: "Chart ID is required" })
            .max(255, { message: "Chart ID must be at most 255 characters" }),
    }).omit({ donut_id: true }),
    Select: createSelectSchema(DonutCharts),
    Update: createUpdateSchema(DonutCharts, {
        chart_id: z
            .string({
                invalid_type_error: "Chart ID must be a string",
            })
            .optional(),
    }).omit({ donut_id: true }),
};

export const HeatmapChartSchema = {
    Insert: createInsertSchema(HeatmapCharts, {
        chart_id: z
            .string({
                required_error: "Chart ID is required",
                invalid_type_error: "Chart ID must be a string",
            })
            .min(1, { message: "Chart ID is required" })
            .max(255, { message: "Chart ID must be at most 255 characters" }),
    }).omit({ heatmap_id: true }),
    Select: createSelectSchema(HeatmapCharts),
    Update: createUpdateSchema(HeatmapCharts, {
        chart_id: z
            .string({
                invalid_type_error: "Chart ID must be a string",
            })
            .optional(),
    }).omit({ heatmap_id: true }),
};

export const RadarChartSchema = {
    Insert: createInsertSchema(RadarCharts, {
        chart_id: z
            .string({
                required_error: "Chart ID is required",
                invalid_type_error: "Chart ID must be a string",
            })
            .min(1, { message: "Chart ID is required" })
            .max(255, { message: "Chart ID must be at most 255 characters" }),
    }).omit({ radar_id: true }),
    Select: createSelectSchema(RadarCharts),
    Update: createUpdateSchema(RadarCharts, {
        chart_id: z
            .string({
                invalid_type_error: "Chart ID must be a string",
            })
            .optional(),
    }).omit({ radar_id: true }),
};
