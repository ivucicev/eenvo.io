/// <reference path="../pb_data/types.d.ts" />

routerUse((e) => {
    e.response.header().set('Access-Control-Expose-Headers', 'Content-Disposition')
    return e.next()
})