// password addon
Array.from(document.querySelectorAll("form .auth-pass-inputgroup")).forEach(function (item) {
    Array.from(item.querySelectorAll(".password-addon")).forEach(function (subitem) {
            subitem.addEventListener("click", function (event) {
                var passwordInput = item.querySelector(".password-input");
                if (passwordInput.type === "password") {
                    passwordInput.type = "text";
                } else {
                    passwordInput.type = "password";
                }
            });
        });
    });

// passowrd match
var password = document.getElementById("password-input"),
    confirm_password = document.getElementById("confirm-password-input");

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity("");
    }
}

//Password validation
password.onchange = validatePassword;

var myInput = document.getElementById("password-input");
var letter = document.getElementById("pass-lower");
var capital = document.getElementById("pass-upper");
var number = document.getElementById("pass-number");
var length = document.getElementById("pass-length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
    document.getElementById("password-contain").style.display = "block";
};

// When the user clicks outside of the password field, hide the password-contain box
myInput.onblur = function () {
    document.getElementById("password-contain").style.display = "none";
};

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
};