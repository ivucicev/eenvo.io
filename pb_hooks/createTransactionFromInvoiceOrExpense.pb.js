/// <reference path="../pb_data/types.d.ts" />


onCollectionAfterUpdateSuccess((e) => {
    console.log("PocketBase Hook Server Started...");
    // e.app
    // e.collection

    e.next()
}, "expenses", "invoices")

onCollectionUpdateRequest((e) => {
    // e.app
    // e.collection
    // and all RequestEvent fields...
    console.log("PocketBase Hook Server Started...", e);

    e.next()
})

onCollectionAfterUpdateSuccess((e) => {
    console.log(e, "WOT?")
    // e.app
    // e.collection

    e.next()
})
