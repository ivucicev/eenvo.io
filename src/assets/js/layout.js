(function () {

    'use strict';

    if (sessionStorage.getItem('defaultAttribute')) {

        var attributesValue = document.documentElement.attributes;
        var CurrentLayoutAttributes = {};
        Object.entries(attributesValue).forEach(function(key) {
            if (key[1] && key[1].nodeName && key[1].nodeName != "undefined") {
                var nodeKey = key[1].nodeName;
                CurrentLayoutAttributes[nodeKey] = key[1].nodeValue;
            }
          });
        if(sessionStorage.getItem('defaultAttribute') !== JSON.stringify(CurrentLayoutAttributes)) {
            sessionStorage.clear();
            window.location.reload();
        } else {
            var isLayoutAttributes = {};
            isLayoutAttributes['data-layout'] = sessionStorage.getItem('data-layout');
            isLayoutAttributes['data-sidebar-size'] = sessionStorage.getItem('data-sidebar-size');
            isLayoutAttributes['data-bs-theme'] = sessionStorage.getItem('data-bs-theme');
            isLayoutAttributes['data-layout-width'] = sessionStorage.getItem('data-layout-width');
            isLayoutAttributes['data-sidebar'] = sessionStorage.getItem('data-sidebar');
            isLayoutAttributes['data-layout-direction'] = sessionStorage.getItem('data-layout-direction');
            isLayoutAttributes['data-layout-position'] = sessionStorage.getItem('data-layout-position');
            isLayoutAttributes['data-layout-style'] = sessionStorage.getItem('data-layout-style');
            isLayoutAttributes['data-topbar'] = sessionStorage.getItem('data-topbar');
            isLayoutAttributes['data-preloader'] = sessionStorage.getItem('data-preloader');
            isLayoutAttributes['data-body-image'] = sessionStorage.getItem('data-body-image');
            
            Object.keys(isLayoutAttributes).forEach(function (x) {
                if (isLayoutAttributes[x] && isLayoutAttributes[x]) {
                    document.documentElement.setAttribute(x, isLayoutAttributes[x]);
                }
            });
        }
    }

})();