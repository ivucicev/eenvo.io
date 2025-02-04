/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2769025244")

  // remove field
  collection.fields.removeById("json935610003")

  // update field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text384653905",
    "max": 0,
    "min": 0,
    "name": "currency",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2769025244")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json935610003",
    "maxSize": 0,
    "name": "currencies",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text384653905",
    "max": 0,
    "min": 0,
    "name": "defaultCurrency",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
