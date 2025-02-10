/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174063690")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_711030668",
    "hidden": false,
    "id": "relation2422544196",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "invoice",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1691921218",
    "hidden": false,
    "id": "relation758812070",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "expense",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174063690")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_711030668",
    "hidden": false,
    "id": "relation2422544196",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "invoice",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1691921218",
    "hidden": false,
    "id": "relation758812070",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "expense",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
