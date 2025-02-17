/// <reference path="../pb_data/types.d.ts" />

//const PocketBase = require('pocketbase');


onCollectionAfterUpdateSuccess((e) => {
    console.log(e.app, e.collection, "WOT?")
    // e.app
    // e.collection
    // create transaction here
    
    e.next()
    }, "invoices", "expenses")