/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3866053794")

  // update collection data
  unmarshal({
    "deleteRule": null,
    "listRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3866053794")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "listRule": "@request.auth.id != \"\" && @request.auth.company = id"
  }, collection)

  return app.save(collection)
})
