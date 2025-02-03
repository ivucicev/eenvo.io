(function () {
    ("use strict");
    var url = "assets/json/";
    var countryListData = '';
    var getJSON = function (jsonurl, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url + jsonurl, true);
        xhr.responseType = "json";
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };
    // get json
    getJSON("country-list.json", function (err, data) {
        if (err !== null) {
            console.log("Something went wrong: " + err);
        } else {
            countryListData = data;
            loadCountryListData(countryListData);
        }
    });
    function loadCountryListData(datas) {
        var mainArray = Array.from(document.querySelectorAll("[data-input-flag]"))
        var flags = '';
        var arr = Array.from(datas);
        for (let index = 0; index < arr.length; index++) {
            flags += '<li class="dropdown-item d-flex">\
            <div class="flex-shrink-0 me-2"><img src="'+ arr[index]['flagImg'] + '" alt="country flag" class="options-flagimg" height="20"></div>\
                <div class="flex-grow-1">\
                <div class="d-flex"><div class="country-name me-1">'+ arr[index]['countryName'] + '</div><span class="countrylist-codeno text-muted">' + arr[index]['countryCode'] + '</span></div>\
            </div>\
            </li>';
        }
        for (let i = 0; i < mainArray.length; i++) {
            mainArray[i].querySelector(".dropdown-menu-list").innerHTML = '';
            mainArray[i].querySelector(".dropdown-menu-list").innerHTML = flags;
            countryListClickEvent(mainArray[i]);
        }
    };
    function countryListClickEvent(item) {
        if (item.querySelector(".country-flagimg")) {
            var countryFlagImg = item.querySelector(".country-flagimg").getAttribute('src');
        }
        Array.from(item.querySelectorAll(".dropdown-menu li")).forEach(function (subitem) {
            var optionFlagImg = subitem.querySelector(".options-flagimg").getAttribute("src");
            subitem.addEventListener("click", function () {
                var optionCodeNo = subitem.querySelector(".countrylist-codeno").innerHTML;
                if (item.querySelector("button")) {
                    item.querySelector("button img").setAttribute("src", optionFlagImg);
                    if (item.querySelector("button span")) {
                        item.querySelector("button span").innerHTML = optionCodeNo;
                    }
                }
            });
            if (countryFlagImg == optionFlagImg) {
                subitem.classList.add("active");
            }
        });
        // data option flag img with name
        Array.from(document.querySelectorAll("[data-option-flag-img-name]")).forEach(function (item) {
            var flagImg = getComputedStyle(item.querySelector(".flag-input")).backgroundImage;
            var countryFlagImg = flagImg.substring(
                flagImg.indexOf("/as") + 1,
                flagImg.lastIndexOf('"')
            );
            Array.from(item.querySelectorAll(".dropdown-menu li")).forEach(function (subitem) {
                var optionFlagImg = subitem.querySelector(".options-flagimg").getAttribute("src");
                subitem.addEventListener("click", function () {
                    var optionCountryName = subitem.querySelector(".country-name").innerHTML;
                    item.querySelector(".flag-input").style.backgroundImage = "url(" + optionFlagImg + ")";
                    item.querySelector(".flag-input").value = optionCountryName;
                });
                if (countryFlagImg == optionFlagImg) {
                    subitem.classList.add("active");
                    item.querySelector(".flag-input").value = subitem.querySelector(".country-name").innerHTML;
                }
            });
        });
        // data option flag img with name
        Array.from(document.querySelectorAll("[data-option-flag-name]")).forEach(function (item) {
            var countryName = item.querySelector(".flag-input").value;
            Array.from(item.querySelectorAll(".dropdown-menu li")).forEach(function (subitem) {
                var optionCountryName = subitem.querySelector(".country-name").innerHTML;
                subitem.addEventListener("click", function () {
                    item.querySelector(".flag-input").value = optionCountryName;
                });
                if (countryName == optionCountryName) {
                    subitem.classList.add("active");
                    item.querySelector(".flag-input").value = subitem.querySelector(".country-name").innerHTML;
                }
            });
        });
    };
    //Search bar
    Array.from(document.querySelectorAll("[data-input-flag]")).forEach(function (item) {
        var searchInput = item.querySelector(".search-countryList");
        if (searchInput) {
            searchInput.addEventListener("keyup", function () {
                var inputVal = searchInput.value.toLowerCase();
                function filterItems(arr, query) {
                    return arr.filter(function (el) {
                        return (el.countryName.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.countryCode.indexOf(query) !== -1)
                    })
                }
                var filterData = filterItems(countryListData, inputVal);
                setTimeout(function () {
                    item.querySelector(".dropdown-menu-list").innerHTML = '';
                    Array.from(filterData).forEach(function (listData) {
                        item.querySelector(".dropdown-menu-list").innerHTML +=
                            '<li class="dropdown-item d-flex">\
                        <div class="flex-shrink-0 me-2"><img src="'+ listData.flagImg + '" alt="country flag" class="options-flagimg" height="20"></div>\
                        <div class="flex-grow-1">\
                        <div class="d-flex"><div class="country-name me-1">'+ listData.countryName + '</div><span class="countrylist-codeno text-muted">' + listData.countryCode + '</span></div>\
                        </div>\
                        </li>';
                    });
                    countryListClickEvent(item);
                }, 350);
            });
        };
    });
})();