/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" && @request.auth.company = company"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" && @request.auth.company = company && @request.auth.id = user"
  }, collection)

  return app.save(collection)
})
