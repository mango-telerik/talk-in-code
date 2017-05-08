import { sammyApp, loader } from "router";
import * as data from "data";

(function() {
    // configure toastr
    // http://codeseven.github.io/toastr/demo.html
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "50",
        "hideDuration": "50",
        "timeOut": "1200",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    };

    // start router
    sammyApp.run('#/');

    // click login -> goes to login page
    $("body").on("click", "#login-button", () => {
        window.location.href = "#/login";
    });

    // click logout -> logouts and goes to home page
    $("body").on("click", "#logout-button", () => {
        // console.log(data);
        data.users.signOut()
            .then((user) => {
                toastr.success("User " + user + " signed out!", "Success!");
                window.location.href = "#/";
                $("#logout-button").fadeOut(100, function() {
                    $("#login-button")
                        .fadeIn(400);
                    $("#login-info").hide();
                });
            })
            .catch(err => {
                toastr.error(err, "Error!");
            });
    });
})();