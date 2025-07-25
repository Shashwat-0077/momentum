"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
    RadarChartStore,
    createRadarChartStore,
    initRadarChartStore,
} from "@/modules/Radar/store/state";
import { ChartStateProvider } from "@/constants";
import { useRadarChart } from "@/modules/Radar/api/client/use-radar-chart";
import { SimpleLoader } from "@/components/ui/Loader";

export type RadarChartStoreApi = ReturnType<typeof createRadarChartStore>;
export const RadarChartStoreContext = createContext<
    RadarChartStoreApi | undefined
>(undefined);

export const RadarChartStoreProvider: ChartStateProvider = ({
    children,
    chartId,
}) => {
    const storeRef = useRef<RadarChartStoreApi>(null);
    const { data: chart, isLoading, error, isError } = useRadarChart(chartId);

    if (!chart || isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <SimpleLoader />
            </div>
        );
    }

    if (isError || error) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="text-red-500">
                    Error: {error?.message || "Something went wrong"}
                </div>
            </div>
        );
    }

    if (!storeRef.current) {
        const { specificConfig, ...rest } = chart;

        storeRef.current = createRadarChartStore(
            initRadarChartStore({
                ...rest,
                ...specificConfig,
            })
        );
    }

    return (
        <RadarChartStoreContext.Provider value={storeRef.current}>
            {children}
        </RadarChartStoreContext.Provider>
    );
};

export const useRadarChartStore = <T,>(
    selector: (store: RadarChartStore) => T
): T => {
    const storeContext = useContext(RadarChartStoreContext);

    if (!storeContext) {
        throw new Error(
            `useRadarChartStore must be used within RadarChartStoreProvider`
        );
    }

    return useStore(storeContext, selector);
};
