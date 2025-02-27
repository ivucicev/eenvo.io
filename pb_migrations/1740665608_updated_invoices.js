/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // remove field
  collection.fields.removeById("text3246891281")

  // add field
  collection.fields.addAt(12, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor3246891281",
    "maxSize": 0,
    "name": "internalNote",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // add field
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

  // remove field
  collection.fields.removeById("editor3246891281")

  return app.save(collection)
})
