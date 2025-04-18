import { z } from "zod";
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";

import { DonutCharts } from "@/modules/Donut/schema/db";
import { DONUT } from "@/constants";
import { ChartSchema } from "@/modules/BasicChart/schema";

// Create base schemas from the Drizzle table
const baseInsertSchema = createInsertSchema(DonutCharts);
const baseSelectSchema = createSelectSchema(DonutCharts);
const baseUpdateSchema = createUpdateSchema(DonutCharts);

// Refine the schemas to properly handle JSON fields
export const DonutSchema = {
    Insert: baseInsertSchema.omit({}),
    Select: baseSelectSchema,
    Update: baseUpdateSchema.omit({
        chart_id: true,
    }),
};

export const FullDonutSchema = {
    Insert: DonutSchema.Insert.extend(ChartSchema.Insert.shape).extend({
        type: z.literal(DONUT),
    }),
    Select: DonutSchema.Select.extend(ChartSchema.Select.shape).extend({
        type: z.literal(DONUT),
    }),
    Update: DonutSchema.Update.extend(ChartSchema.Update.shape).extend({
        type: z.literal(DONUT),
    }),
};

// Types for the schemas
export type DonutInsert = z.infer<typeof DonutSchema.Insert>;
export type DonutSelect = z.infer<typeof DonutSchema.Select>;
export type DonutUpdate = z.infer<typeof DonutSchema.Update>;

export type FullDonutInsert = z.infer<typeof FullDonutSchema.Insert>;
export type FullDonutSelect = z.infer<typeof FullDonutSchema.Select>;
export type FullDonutUpdate = z.infer<typeof FullDonutSchema.Update>;
