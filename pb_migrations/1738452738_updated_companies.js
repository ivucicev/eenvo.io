/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3866053794")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && @request.auth.company = id",
    "deleteRule": "@request.auth.id != \"\" && @request.auth.company = id",
    "listRule": "@request.auth.id != \"\" && @request.auth.company = id",
    "updateRule": "@request.auth.id != \"\" && @request.auth.company = id",
    "viewRule": "@request.auth.id != \"\" && @request.auth.company = id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3866053794")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "listRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
})
