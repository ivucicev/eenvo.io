/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // add field
  collection.fields.addAt(28, new Field({
    "hidden": false,
    "id": "bool3045245328",
    "name": "showValues",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(29, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text659622272",
    "max": 0,
    "min": 0,
    "name": "poShipping",
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

  // remove field
  collection.fields.removeById("bool3045245328")

  // remove field
  collection.fields.removeById("text659622272")

  return app.save(collection)
})
