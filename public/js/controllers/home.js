import * as templates from "templates";
import $ from "jquery";
import * as data from "data";
import * as toastr from "toastr";

function all(context) {
    templates.get("login")
        .then(template => {
            context
                .$element()
                .find("#form-field")
                .html(template());
        })
        .then(() => {
            $("#main-nav-panel").show();

            if (data.hasUser()) {
                $('#container-sign-in').hide();
            } else {
                $('#container-sign-out').hide();
            }

            $('#btn-sign-out').on('click', function() {
                data.signOut()
                    .then(function() {
                        toastr.success('User signed out!');
                        //document.location = '#/register';
                        context.redirect('#/home');
                        setTimeout(function() {
                            $('#container-sign-out').fadeOut(100, function() {
                                $('#container-sign-in').fadeIn(500);
                            });
                        }, 1000);
                    });
            });

            $('#btn-sign-in').on('click', function(e) {
                var user = {
                    username: $('#tb-username').val(),
                    password: $('#tb-password').val()
                };
                data.signIn(user)
                    .then(function(user) {
                        toastr.success('User signed in!');
                        //document.location = '#/register';
                        context.redirect('#/home');
                        setTimeout(function() {
                            $('#container-sign-in').fadeOut(100, function() {
                                $('#container-sign-out').fadeIn(500);
                            });
                        }, 1000);
                    }, function(err) {
                        toastr.error(err.responseText);
                    });
            });
        })
        .then(templates.get("home")
            .then(template => {
                context
                    .$element()
                    .find("#main-content")
                    .html(template());
            })
        )
}

export { all };