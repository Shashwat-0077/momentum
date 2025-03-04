import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";

import collections from "@/modules/collections/server/route";
import auth from "@/modules/auth/server/route";
import charts from "@/modules/charts/server/route";
import notion from "@/modules/notion/server/route";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse();
    }
    return c.json({ error: "Internal error", message: err.message }, 500);
});

const _routes = app
    .route("/collections", collections)
    .route("/auth", auth)
    .route("/charts", charts)
    .route("/notion", notion);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
