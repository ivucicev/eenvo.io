/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // add field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "bool3154681846",
    "name": "isPayed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(18, new Field({
    "hidden": false,
    "id": "date1889812618",
    "max": "",
    "min": "",
    "name": "paymentDate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // remove field
  collection.fields.removeById("bool3154681846")

  // remove field
  collection.fields.removeById("date1889812618")

  return app.save(collection)
})
