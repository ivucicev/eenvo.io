/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // add field
  collection.fields.addAt(25, new Field({
    "hidden": false,
    "id": "select3571151285",
    "maxSelect": 1,
    "name": "language",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "en",
      "de",
      "fr",
      "it",
      "es",
      "hr",
      "pl"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // remove field
  collection.fields.removeById("select3571151285")

  return app.save(collection)
})
