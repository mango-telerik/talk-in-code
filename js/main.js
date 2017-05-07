import { sammyApp, loader } from "router";
import * as data from "data";

(function() {
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