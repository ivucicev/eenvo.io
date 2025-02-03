/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Form wizard Js File
*/

// user profile img file upload
if (document.querySelector("#profile-img-file-input"))
    document.querySelector("#profile-img-file-input").addEventListener("change", function () {
        var preview = document.querySelector(".user-profile-image");
        var file = document.querySelector(".profile-img-file-input").files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file)
            reader.readAsDataURL(file);
    });

if (document.querySelectorAll(".form-steps"))
    Array.from(document.querySelectorAll(".form-steps")).forEach(function (form) {

        // next tab
        if (form.querySelectorAll(".nexttab"))
            Array.from(form.querySelectorAll(".nexttab")).forEach(function (nextButton) {
                var tabEl = form.querySelectorAll('button[data-bs-toggle="pill"]');
                Array.from(tabEl).forEach(function (item) {
                    item.addEventListener('show.bs.tab', function (event) {
                        event.target.classList.add('done');
                    });
                });
                nextButton.addEventListener("click", function () {
                    var nextTab = nextButton.getAttribute('data-nexttab');
                    document.getElementById(nextTab).click();
                });
            });

        //Pervies tab
        if (form.querySelectorAll(".previestab"))
            Array.from(form.querySelectorAll(".previestab")).forEach(function (prevButton) {

                prevButton.addEventListener("click", function () {
                    var prevTab = prevButton.getAttribute('data-previous');
                    var totalDone = prevButton.closest("form").querySelectorAll(".custom-nav .done").length;
                    for (var i = totalDone - 1; i < totalDone; i++) {
                        (prevButton.closest("form").querySelectorAll(".custom-nav .done")[i]) ? prevButton.closest("form").querySelectorAll(".custom-nav .done")[i].classList.remove('done'): '';
                    }
                    document.getElementById(prevTab).click();
                });
            });

        // Step number click
        var tabButtons = form.querySelectorAll('button[data-bs-toggle="pill"]');
        if (tabButtons)
            Array.from(tabButtons).forEach(function (button, i) {
                button.setAttribute("data-position", i);
                button.addEventListener("click", function () {
                    var getProgressBar = button.getAttribute("data-progressbar");
                    if (getProgressBar) {
                        var totalLength = document.getElementById("custom-progress-bar").querySelectorAll("li").length - 1;
                        var current = i;
                        var percent = (current / totalLength) * 100;
                        document.getElementById("custom-progress-bar").querySelector('.progress-bar').style.width = percent + "%";
                    }
                    (form.querySelectorAll(".custom-nav .done").length > 0) ?
                    Array.from(form.querySelectorAll(".custom-nav .done")).forEach(function (doneTab) {
                        doneTab.classList.remove('done');
                    }): '';
                    for (var j = 0; j <= i; j++) {
                        tabButtons[j].classList.contains('active') ? tabButtons[j].classList.remove('done') : tabButtons[j].classList.add('done');
                    }
                });
            });
    });