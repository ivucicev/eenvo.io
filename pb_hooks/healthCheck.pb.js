/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/api/health-check", (e) => {
    return e.json(200, { "status": "healthy" })
})