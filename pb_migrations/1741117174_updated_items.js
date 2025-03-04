/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_710432678")

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_3866053794",
    "hidden": false,
    "id": "relation1337919823",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "company",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_710432678")

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3866053794",
    "hidden": false,
    "id": "relation1337919823",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "company",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
