/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174063690")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" && @request.auth.company = company && @request.auth.id = user",
    "updateRule": "@request.auth.id != \"\" && @request.auth.company = company && @request.auth.id = user"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174063690")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" && @request.auth.company = company && @request.auth.id = id",
    "updateRule": "@request.auth.id != \"\" && @request.auth.company = company && @request.auth.id = id"
  }, collection)

  return app.save(collection)
})
