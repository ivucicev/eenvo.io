/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Sweatalerts init js
*/

//Basic
if (document.getElementById("sa-basic"))
    document.getElementById("sa-basic").addEventListener("click", function () {
        Swal.fire({
            title: 'Any fool can use a computer',
            customClass: {
                confirmButton: 'btn btn-primary w-xs mt-2',
            },
            showCloseButton: true
        })
    });

//A title with a text under
if (document.getElementById("sa-title"))
    document.getElementById("sa-title").addEventListener("click", function () {
        Swal.fire({
            title: "The Internet?",
            text: 'That thing is still around?',
            icon: 'question',
            customClass: {
                confirmButton: 'btn btn-primary w-xs mt-2',
            },
            buttonsStyling: false,
            showCloseButton: true
        })
    });

//Success Message
if (document.getElementById("sa-success"))
    document.getElementById("sa-success").addEventListener("click", function () {
        Swal.fire({
            title: 'Good job!',
            text: 'You clicked the button!',
            icon: 'success',
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-primary w-xs me-2 mt-2',
                cancelButton: 'btn btn-danger w-xs mt-2',
            },
            buttonsStyling: false,
            showCloseButton: true
        })
    });

//error Message
if (document.getElementById("sa-error"))
    document.getElementById("sa-error").addEventListener("click", function () {
        Swal.fire({
            title: 'Oops...',
            text: 'Something went wrong!',
            icon: 'error',
            customClass: {
                confirmButton: 'btn btn-primary w-xs mt-2',
            },
            buttonsStyling: false,
            footer: '<a href="">Why do I have this issue?</a>',
            showCloseButton: true
        })
    });

// long content
if (document.getElementById("sa-longcontent"))
    document.getElementById("sa-longcontent").addEventListener("click", function () {
        Swal.fire({
            imageUrl: 'https://placeholder.pics/svg/300x1500',
            imageHeight: 1500,
            imageAlt: 'A tall image',
            customClass: {
                confirmButton: 'btn btn-primary w-xs mt-2',
            },
            buttonsStyling: false,
            showCloseButton: true
        })
    });

//Warning Message
if (document.getElementById("sa-warning"))
    document.getElementById("sa-warning").addEventListener("click", function () {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-primary w-xs me-2 mt-2',
                cancelButton: 'btn btn-danger w-xs mt-2',
            },
            confirmButtonText: "Yes, delete it!",
            buttonsStyling: false,
            showCloseButton: true
        }).then(function (result) {
            if (result.value) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary w-xs mt-2',
                    },
                    buttonsStyling: false
                })
            }
        });
    });

//Parameter
if (document.getElementById("sa-params"))
    document.getElementById("sa-params").addEventListener("click", function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            customClass: {
                confirmButton: 'btn btn-primary w-xs me-2 mt-2',
                cancelButton: 'btn btn-danger w-xs mt-2',
            },
            buttonsStyling: false,
            showCloseButton: true
        }).then(function (result) {
            if (result.value) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary w-xs mt-2',
                    },
                    buttonsStyling: false
                })
            } else if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your imaginary file is safe :)',
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-primary mt-2',
                    },
                    buttonsStyling: false
                })
            }
        });
    });


//Custom Image
if (document.getElementById("sa-image"))
    document.getElementById("sa-image").addEventListener("click", function () {
        Swal.fire({
            title: 'Sweet!',
            text: 'Modal with a custom image.',
            imageUrl: 'assets/images/logo-sm.png',
            imageHeight: 40,
            customClass: {
                confirmButton: 'btn btn-primary w-xs mt-2',
            },
            buttonsStyling: false,
            animation: false,
            showCloseButton: true
        })
    });

//Auto Close Timer
if (document.getElementById("sa-close"))
    document.getElementById("sa-close").addEventListener("click", function () {
        var timerInterval;
        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <strong></strong> seconds.',
            timer: 2000,
            timerProgressBar: true,
            showCloseButton: true,
            didOpen: function () {
                Swal.showLoading()
                timerInterval = setInterval(function () {
                    var content = Swal.getHtmlContainer()
                    if (content) {
                        var b = content.querySelector('b')
                        if (b) {
                            b.textContent = Swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            onClose: function () {
                clearInterval(timerInterval)
            }
        }).then(function (result) {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    });

//custom html alert
if (document.getElementById("custom-html-alert"))
    document.getElementById("custom-html-alert").addEventListener("click", function () {
        Swal.fire({
            title: '<i>HTML</i> <u>example</u>',
            icon: 'info',
            html: 'You can use <b>bold text</b>, ' +
                '<a href="//Themesbrand.in/">links</a> ' +
                'and other HTML tags',
            showCloseButton: true,
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger',
            },
            buttonsStyling: false,
            confirmButtonText: '<i class="ri-thumb-up-fill align-bottom me-1"></i> Great!',
            cancelButtonText: '<i class="ri-thumb-down-fill align-bottom"></i>',
            showCloseButton: true
        })
    });

//dialog three buttons
if (document.getElementById("sa-dialog-three-btn"))
    document.getElementById("sa-dialog-three-btn").addEventListener("click", function () {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            customClass: {
                confirmButton: 'btn btn-success w-xs me-2',
                cancelButton: 'btn btn-danger w-xs',
                denyButton: 'btn btn-info w-xs me-2',
            },
            buttonsStyling: false,
            denyButtonText: 'Don\'t save',
            showCloseButton: true
        }).then(function (result) {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Saved!',
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary w-xs',
                    },
                    buttonsStyling: false,
                })
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Changes are not saved',
                    icon: 'info',
                    customClass: {
                        confirmButton: 'btn btn-primary w-xs',
                    },
                    buttonsStyling: false,
                })
            }
        })
    });

//position
if (document.getElementById("sa-position"))
    document.getElementById("sa-position").addEventListener("click", function () {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
            showCloseButton: true
        })
    });

//Custom width padding
if (document.getElementById("custom-padding-width-alert"))
    document.getElementById("custom-padding-width-alert").addEventListener("click", function () {
        Swal.fire({
            title: 'Custom width, padding, background.',
            width: 600,
            padding: 100,
            customClass: {
                confirmButton: 'btn btn-primary w-xs',
            },
            buttonsStyling: false,
            background: 'var(--in-secondary-bg) url(assets/images/chat-bg-pattern.png)'
        })
    });

//Ajax
if (document.getElementById("ajax-alert"))
    document.getElementById("ajax-alert").addEventListener("click", function () {
        Swal.fire({
            title: 'Submit email to run ajax request',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            customClass: {
                confirmButton: 'btn btn-primary w-xs me-2',
                cancelButton: 'btn btn-danger w-xs',
            },
            buttonsStyling: false,
            showCloseButton: true,
            preConfirm: function (email) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (email === 'taken@example.com') {
                            reject('This email is already taken.')
                        } else {
                            resolve()
                        }
                    }, 2000)
                })
            },
            allowOutsideClick: false
        }).then(function (email) {
            Swal.fire({
                icon: 'success',
                title: 'Ajax request finished!',
                customClass: {
                    confirmButton: 'btn btn-primary w-xs',
                },
                buttonsStyling: false,
                html: 'Submitted email: ' + email
            })
        })
    });


// Custom SweatAlerts

//Custom success Message
if (document.getElementById("custom-sa-success"))
    document.getElementById("custom-sa-success").addEventListener("click", function () {
        Swal.fire({
            html: '<div class="mt-3">' +
                '<lord-icon src="https://cdn.lordicon.com/lupuorrc.json" trigger="loop" colors="primary:#0ab39c,secondary:#405189" style="width:120px;height:120px"></lord-icon>' +
                '<div class="mt-4 pt-2 fs-15">' +
                '<h4>Well done !</h4>' +
                '<p class="text-muted mx-4 mb-0">Aww yeah, you successfully read this important message.</p>' +
                '</div>' +
                '</div>',
            showCancelButton: true,
            showConfirmButton: false,
            customClass: {
                cancelButton: 'btn btn-primary w-xs mb-1',
            },
            cancelButtonText: 'Back',
            buttonsStyling: false,
            showCloseButton: true
        })
    });

//Custom error Message
if (document.getElementById("custom-sa-error"))
    document.getElementById("custom-sa-error").addEventListener("click", function () {
        Swal.fire({
            html: '<div class="mt-3">' +
                '<lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon>' +
                '<div class="mt-4 pt-2 fs-15">' +
                '<h4>Oops...! Something went Wrong !</h4>' +
                '<p class="text-muted mx-4 mb-0">Your email Address is invalid</p>' +
                '</div>' +
                '</div>',
            showCancelButton: true,
            showConfirmButton: false,
            customClass: {
                cancelButton: 'btn btn-primary w-xs mb-1',
            },
            cancelButtonText: 'Dismiss',
            buttonsStyling: false,
            showCloseButton: true
        })
    });

//Custom error Message
if (document.getElementById("custom-sa-warning"))
    document.getElementById("custom-sa-warning").addEventListener("click", function () {
        Swal.fire({
            html: '<div class="mt-3">' +
                '<lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon>' +
                '<div class="mt-4 pt-2 fs-15 mx-5">' +
                '<h4>Are you Sure ?</h4>' +
                '<p class="text-muted mx-4 mb-0">Are you Sure You want to Delete this Account ?</p>' +
                '</div>' +
                '</div>',
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-primary w-xs me-2 mb-1',
                cancelButton: 'btn btn-danger w-xs mb-1',
            },
            confirmButtonText: 'Yes, Delete It!',
            buttonsStyling: false,
            showCloseButton: true
        })
    });

// custom Join Our Community
if (document.getElementById("custom-sa-community"))
    document.getElementById("custom-sa-community").addEventListener("click", function () {
        Swal.fire({
            title: 'Join Our Community',
            html: 'You can use <b>bold text</b>, ' +
                '<a href="//Themesbrand.in/">links</a> ' +
                'and other HTML tags',
            html: '<div class="mt-3 text-start">' +
                '<label for="input-email" class="form-label fs-13">Email</label>' +
                '<input type="email" class="form-control" id="input-email" placeholder="Enter Email Address">' +
                '</div>',
            imageUrl: 'assets/images/logo-sm.png',
            footer: '<p class="fs-13 text-muted mb-0">Already have an account ? <a href="#" class="fw-semibold text-decoration-underline"> Signin </a> </p>',
            imageHeight: 40,
            customClass: {
                confirmButton: 'btn btn-primary w-xs mb-2',
            },
            confirmButtonText: 'Register <i class="ri-arrow-right-line ms-1 align-bottom"></i>',
            buttonsStyling: false,
            showCloseButton: true
        })
    });

//Custom Email varification
if (document.getElementById("custom-sa-email-verify"))
    document.getElementById("custom-sa-email-verify").addEventListener("click", function () {
        Swal.fire({
            html: '<div class="mt-3">' +
                '<div class="avatar-lg mx-auto">' +
                '<div class="avatar-title bg-light text-success display-5 rounded-circle">' +
                '<i class="ri-mail-send-fill"></i>' +
                '</div>' +
                '</div>' +
                '<div class="mt-4 pt-2 fs-15">' +
                '<h4 class="fs-20 fw-semibold">Verify Your Email</h4>' +
                '<p class="text-muted mb-0 mt-3">We have sent you verification email <span class="fw-medium">example@abc.com</span>, <br/> Please check it.</p>' +
                '</div>' +
                '</div>',
            showCancelButton: false,
            customClass: {
                confirmButton: 'btn btn-primary mb-1',
            },
            confirmButtonText: 'Verify Email',
            buttonsStyling: false,
            footer: '<p class="fs-14 text-muted mb-0">Didn\'t receive an email ? <a href="#" class="fw-semibold text-decoration-underline">Resend</a></p>',
            showCloseButton: true
        })
    });


//Custom notification Message
if (document.getElementById("custom-sa-notification"))
    document.getElementById("custom-sa-notification").addEventListener("click", function () {
        Swal.fire({
            html: '<div class="mt-3">' +
                '<div class="avatar-lg mx-auto">' +
                '<img src="assets/images/users/avatar-2.jpg" class="rounded-circle img-thumbnail" alt="thumbnail">' +
                '</div>' +
                '<div class="mt-4 pt-2 fs-15">' +
                '<h4 class="fs-18 fw-semibold">Welcome <span class="fw-semibold">Mike Mayer</span></h4>' +
                '<p class="text-muted mb-0 fs-13">You have <span class="fw-semibold text-success">2</span> Notifications</p>' +
                '</div>' +
                '</div>',
            showCancelButton: false,
            customClass: {
                confirmButton: 'btn btn-primary mb-1',
            },
            confirmButtonText: 'Show Me <i class="ri-arrow-right-line ms-1 align-bottom"></i>',
            buttonsStyling: false,
            showCloseButton: true
        })
    });