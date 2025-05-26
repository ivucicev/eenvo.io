/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "mfa": {
      "enabled": true,
      "rule": "mfaActive = true"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "mfa": {
      "enabled": false,
      "rule": ""
    }
  }, collection)

  return app.save(collection)
})
