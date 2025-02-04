/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // add field
  collection.fields.addAt(20, new Field({
    "hidden": false,
    "id": "number2036146560",
    "max": null,
    "min": null,
    "name": "subTotal",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(21, new Field({
    "hidden": false,
    "id": "number2635860179",
    "max": null,
    "min": null,
    "name": "taxValue",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(22, new Field({
    "hidden": false,
    "id": "number521208465",
    "max": null,
    "min": null,
    "name": "discountValue",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // remove field
  collection.fields.removeById("number2036146560")

  // remove field
  collection.fields.removeById("number2635860179")

  // remove field
  collection.fields.removeById("number521208465")

  return app.save(collection)
})
