/// <reference path="../pb_data/types.d.ts" />

onRecordAfterUpdateSuccess((e) => {

    const existingTransaction = new DynamicModel({
        "id": "",
    });

    try {        
        $app.db()
            .newQuery(`SELECT id FROM transactions WHERE expense={:expense}`)
            .bind({
                "expense": e.record.id
            })
            .one(existingTransaction);
    } catch (error) {
        e.next();
    }

    const transactionData = {
        date: e.record.get('date'),
        title: e.record.get('title'),
        company: e.record.get('company'),
        total: e.record.get('total'),
        category: e.record.get('category'),
        user: e.record.get('user'),
        created: e.record.get('created') ?? new Date(),
        updated: new Date(),
    };


    if (existingTransaction?.id) {
        $app.db().update('transactions', transactionData, $dbx.exp("id = {:id}", { id: existingTransaction?.id })).execute();
    }

    e.next()
}, "expenses")

onRecordAfterUpdateSuccess((e) => {

    if (!e?.record?.getBool('isPaid')) e.next();
    if (!e?.record?.getBool('isQuote')) e.next();
    if (!e?.record?.getBool('isPO')) e.next();

    const existingTransaction = new DynamicModel({
        "id": "",
    });

    try {
        $app.db()
            .newQuery(`SELECT id FROM transactions WHERE invoice={:invoice}`)
            .bind({
                "invoice": e.record.get('id')
            })
            .one(existingTransaction);
    } catch (err) {
    }

    const transactionData = {
        date: e.record.get('paymentDate'),
        title: e.record.get('number'),
        company: e.record.get('company'),
        invoice: e.record.id,
        total: e.record.get('total'),
        user: e.record.get('user'),
        updated: new Date(),
        created: e.record.get('created') ?? new Date(),
        type: 'in'
    };

    // transaction is already there for this invoice
    if (existingTransaction.id) {
        $app.db().update('transactions', transactionData, $dbx.exp("id = {:id}", { id: existingTransaction?.id })).execute();
    } else {
        $app.db().insert('transactions', transactionData).execute();
    }

    e.next()
    
}, "invoices")