"use client";

import { cn } from "@/lib/utils";
import { getRGBAString } from "@/utils/colors";

interface ChartViewWrapperProps {
    children: React.ReactNode;
    bgColor: { r: number; g: number; b: number; a: number };
    borderColor: { r: number; g: number; b: number; a: number };
    borderWidth: number;
    className?: string;
}

export function ChartViewWrapper({
    children,
    bgColor,
    className,
    borderColor,
    borderWidth,
}: ChartViewWrapperProps) {
    return (
        <div
            style={{
                backgroundColor: getRGBAString(bgColor, true),
                borderColor: getRGBAString(borderColor, true),
                borderWidth: `${borderWidth}px`,
            }}
            className={cn(
                "relative flex min-h-[300px] w-full flex-col items-center justify-center rounded-xl p-4",
                className
            )}
        >
            {children}
        </div>
    );
}
