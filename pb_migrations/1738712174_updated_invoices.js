/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "[a-z0-9]{30}",
    "hidden": false,
    "id": "text3246891281",
    "max": 0,
    "min": 0,
    "name": "internalNote",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3246891281",
    "max": 0,
    "min": 0,
    "name": "internalNote",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
