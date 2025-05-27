/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3292755704")

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
  const collection = app.findCollectionByNameOrId("pbc_3292755704")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": "@request.auth.company = company",
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
