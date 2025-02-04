/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Notifications init js
*/

// Bordered Toast 
var toastTrigger2 = document.getElementById("borderedToast1Btn");
var toastLiveExample2 = document.getElementById("borderedToast1");
if (toastTrigger2 && toastLiveExample2) {
    toastTrigger2.addEventListener("click", function () {
        var toast = new bootstrap.Toast(toastLiveExample2);
        toast.show();
    });
}

var toastTrigger3 = document.getElementById("borderedToast2Btn");
var toastLiveExample3 = document.getElementById("borderedToast2");
if (toastTrigger3 && toastLiveExample3) {
    toastTrigger3.addEventListener("click", function () {
        var toast = new bootstrap.Toast(toastLiveExample3);
        toast.show();
    });
}

var toastTrigger4 = document.getElementById("borderedTost3Btn");
var toastLiveExample4 = document.getElementById("borderedTost3");
if (toastTrigger4 && toastLiveExample4) {
    toastTrigger4.addEventListener("click", function () {
        var toast = new bootstrap.Toast(toastLiveExample4);
        toast.show();
    });
}

var toastTrigger5 = document.getElementById("borderedToast4Btn");
var toastLiveExample5 = document.getElementById("borderedToast4");
if (toastTrigger5 && toastLiveExample5) {
    toastTrigger5.addEventListener("click", function () {
        var toast = new bootstrap.Toast(toastLiveExample5);
        toast.show();
    });
}

// placement toast
toastPlacement = document.getElementById("toastPlacement");
toastPlacement && document.getElementById("selectToastPlacement").addEventListener("change", function () {
    toastPlacement.dataset.originalClass ||
        (toastPlacement.dataset.originalClass = toastPlacement.className),
        (toastPlacement.className =
            toastPlacement.dataset.originalClass + " " + this.value);
}),

Array.from(document.querySelectorAll(".bd-example .toast")).forEach(function (a) {
    var b = new bootstrap.Toast(a, {
        autohide: !1
    });
    b.show();
});