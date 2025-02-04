/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Form Advanced Js File
*/

// multiselect

var multiSelectBasic = document.getElementById("multiselect-basic");
if (multiSelectBasic) {
    multi(multiSelectBasic, {
        enable_search: false
    });
}

var multiSelectHeader = document.getElementById("multiselect-header");
if (multiSelectHeader) {
    multi(multiSelectHeader, {
        non_selected_header: "Cars",
        selected_header: "Favorite Cars"
    });
}

var multiSelectOptGroup = document.getElementById("multiselect-optiongroup");
if (multiSelectOptGroup) {
    multi(multiSelectOptGroup, {
        enable_search: true
    });
}

// Autocomplete
var autoCompleteFruit = new autoComplete({
    selector: "#autoCompleteFruit",
    placeHolder: "Search for Fruits...",
    data: {
        src: ["Apple", "Banana", "Blueberry", "Cherry", "Coconut", "Kiwi", "Lemon", "Lime", "Mango", "Orange"],
        cache: true
    },
    resultsList: {
        element: function element(list, data) {
            if (!data.results.length) {
                // Create "No Results" message element
                var message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = "<span>Found No Results for \"" + data.query + "\"</span>";
                // Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: function selection(event) {
                var selection = event.detail.selection.value;
                autoCompleteFruit.input.value = selection;
            }
        }
    }
});

var autoCompleteCars = new autoComplete({
    selector: "#autoCompleteCars",
    placeHolder: "Search for Cars...",
    data: {
        src: ["Chevrolet", "Fiat", "Ford", "Honda", "Hyundai", "Hyundai", "Kia", "Mahindra", "Maruti", "Mitsubishi", "MG", "Nissan", "Renault", "Skoda", "Tata", "Toyato", "Volkswagen"],
        cache: true
    },
    resultsList: {
        element: function element(list, data) {
            if (!data.results.length) {
                // Create "No Results" message element
                var message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = "<span>Found No Results for \"" + data.query + "\"</span>";
                // Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: function selection(event) {
                var selection = event.detail.selection.value;
                autoCompleteCars.input.value = selection;
            }
        }
    }
});