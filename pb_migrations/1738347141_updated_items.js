/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_710432678")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select3703245907",
    "maxSelect": 1,
    "name": "unit",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "-",
      "Hour",
      "Piece",
      "Kg",
      "Km",
      "L",
      "Year",
      "Month"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_710432678")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select3703245907",
    "maxSelect": 1,
    "name": "unit",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "-",
      "Piece",
      "Hour",
      "Month",
      "Year",
      "L",
      "Kg"
    ]
  }))

  return app.save(collection)
})
