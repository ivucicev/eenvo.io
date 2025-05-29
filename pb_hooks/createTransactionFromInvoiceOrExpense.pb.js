/// <reference path="../pb_data/types.d.ts" />


onRecordAfterCreateSuccess((e) => {
    const transactionData = {
        expense: e.record.get('id'),
        date: e.record.get('date'),
        title: e.record.get('title'),
        company: e.record.get('company'),
        total: e.record.get('total'),
        user: e.record.get('user'),
        //category: e.record.get('category'),
        created: new Date(),
        updated: new Date(),
        type: 'out'
    };
    console.log("***********************")
    console.log( e.record.get('category'))
    console.log("***********************")
    $app.db().insert('transactions', transactionData).execute();
    e.next()
}, "expenses");