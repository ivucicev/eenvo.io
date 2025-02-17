/// <reference path="../pb_data/types.d.ts" />

onRecordAuthWithOAuth2Request((e) => {

    if (!e?.record?.company) {

        const name = 'DEFAULT_' + new Date().getTime();
        const email = e?.oAuth2User.email;
        
        const companyCreated = $app.db().insert('companies', {
            name,
            email,
            vatID: 'IDXXXXXXXXXXX',
            iban: 'IBXXXXXXXXXXXXX'
        }).execute();

        const result = new DynamicModel({
            "id": "",
        })
        
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