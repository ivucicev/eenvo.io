/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update field
  collection.fields.addAt(30, new Field({
    "hidden": false,
    "id": "file4101391790",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [
      "application/pdf"
    ],
    "name": "pdfUrl",
    "presentable": false,
    "protected": true,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_711030668")

  // update field
  collection.fields.addAt(30, new Field({
    "hidden": false,
    "id": "file4101391790",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "application/pdf"
    ],
    "name": "pdfUrl",
    "presentable": false,
    "protected": true,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
