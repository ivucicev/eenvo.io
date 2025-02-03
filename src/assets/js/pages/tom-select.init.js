/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: tom-select init js
*/


new TomSelect('#select-links', {
    valueField: 'id',
    searchField: 'title',
    options: [
        { id: 1, title: 'DIY', url: 'https://diy.org' },
        { id: 2, title: 'Google', url: 'http://google.com' },
        { id: 3, title: 'Yahoo', url: 'http://yahoo.com' },
    ],
    render: {
        option: function (data, escape) {
            return '<div>' +
                '<span class="title">' + escape(data.title) + '</span>' +
                '<span class="url">' + escape(data.url) + '</span>' +
                '</div>';
        },
        item: function (data, escape) {
            return '<div title="' + escape(data.url) + '">' + escape(data.title) + '</div>';
        }
    }
});


//Email Contacts

var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

var formatName = function (item) {
    return ((item.first || '') + ' ' + (item.last || '')).trim();
};

new TomSelect('#select-to', {
    persist: false,
    maxItems: null,
    valueField: 'email',
    labelField: 'name',
    searchField: ['first', 'last', 'email'],
    sortField: [
        { field: 'first', direction: 'asc' },
        { field: 'last', direction: 'asc' }
    ],
    options: [
        { email: 'nikola@tesla.com', first: 'Nikola', last: 'Tesla' },
        { email: 'brian@thirdroute.com', first: 'Brian', last: 'Reavis' },
        { email: 'someone@gmail.com' },
        { email: 'example@gmail.com' },
    ],
    render: {
        item: function (item, escape) {
            var name = formatName(item);
            return '<div>' +
                (name ? '<span class="name">' + escape(name) + '</span>' : '') +
                (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                '</div>';
        },
        option: function (item, escape) {
            var name = formatName(item);
            var label = name || item.email;
            var caption = name ? item.email : null;
            return '<div>' +
                '<span class="label">' + escape(label) + '</span>' +
                (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                '</div>';
        }
    },
    createFilter: function (input) {
        var regexpA = new RegExp('^' + REGEX_EMAIL + '$', 'i');
        var regexpB = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
        return regexpA.test(input) || regexpB.test(input);
    },
    create: function (input) {
        if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
            return { email: input };
        }
        var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
        if (match) {
            var name = match[1].trim();
            var pos_space = name.indexOf(' ');
            var first = name.substring(0, pos_space);
            var last = name.substring(pos_space + 1);

            return {
                email: match[2],
                first: first,
                last: last
            };
        }
        alert('Invalid email address.');
        return false;
    }
});

// Form Validation

// Browser Defaults
new TomSelect('#select-person', {
    create: true,
    sortField: {
        field: 'text',
        direction: 'asc'
    }
});

//bootstrap validation
var my_select = new TomSelect('#select-bootstrap');

// Example starter JavaScript for disabling form submissions if there are invalid fields
var form = document.getElementById('bootstrap-form')
form.addEventListener('submit', function (event) {

    // add was-validated to display custom colors
    form.classList.add('was-validated')

    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

}, false)

//Pattern Attribute

new TomSelect('#pattern', {
    create: true,
});


//flag
new TomSelect('.data-attr', {
    render: {
        option: function (data, escape) {
            return `<div><img class="me-2" src="${data.src}">${data.text}</div>`;
        },
        item: function (item, escape) {
            return `<div><img class="me-2" src="${item.src}">${item.text}</div>`;
        }
    }
});


new TomSelect('.data-flag', {
    render: {
        option: function (data, escape) {
            return `<div><img class="me-2 avatar-xxs rounded" src="${data.src}">${data.text}</div>`;
        },
        item: function (item, escape) {
            return `<div><img class="me-2 avatar-xxs rounded" src="${item.src}">${item.text}</div>`;
        }
    }
});