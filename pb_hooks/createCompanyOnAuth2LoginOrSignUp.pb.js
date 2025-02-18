/// <reference path="../pb_data/types.d.ts" />

onRecordAuthWithOAuth2Request((e) => {

    const userResult = new DynamicModel({
        "id": "",
        "company": "",
    });

    if (e.record?.id) {
        const user = $app.db()
        .newQuery(`SELECT id, company FROM users WHERE email={:email} and id={:id}`)
        .bind({
            "id": e.record?.id,
            "email": e.oAuth2User?.email
        })
        .one(userResult);
    }
    
    if (!userResult?.company) {
        const name = 'DEFAULT_' + new Date().getTime();
        const email = e?.oAuth2User.email;
        const companyCreated = $app.db().insert('companies', {
            name,
            email,
            isRegistrationComplete: false,
            vatID: 'IDXXXXXXXXXXX',
            iban: 'IBXXXXXXXXXXXXX'
        }).execute();

        const result = new DynamicModel({
            "id": "",
        });

        $app.db()
            .newQuery(`SELECT id FROM companies WHERE email={:email} and name={:name}`)
            .bind({
                "email": email,
                "name": name
            })
            .one(result);

        e.createData = { company: result.id };

    }

    e.next();
})