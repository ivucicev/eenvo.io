/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "bool3154681846",
    "name": "isPaid",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "bool3154681846",
    "name": "isPayed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
