/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\" && @request.auth.company = company",
    "deleteRule": "@request.auth.id != \"\" && @request.auth.company = company",
    "listRule": "@request.auth.id != \"\" && @request.auth.company = company",
    "updateRule": "@request.auth.id != \"\" && @request.auth.company = company",
    "viewRule": "@request.auth.id != \"\" && @request.auth.company = company"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

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
