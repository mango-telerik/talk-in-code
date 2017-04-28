import * as data from "data";
import User from "userObj";

function toggleMenu() {
    $("#show-form").on("click", () => $("#login-panel").slideDown(400, () => {
        $("#show-form").fadeOut();
    }));
    $("#hide-form").on("click", () => $("#login-panel").slideUp(400, () => {
        $("#show-form").fadeIn();
    }));

    if (data.currentUser()) {
        $('#container-sign-in').hide();
    } else {
        $('#container-sign-out').hide();
    }
}

function signIn(context) {
    $('#btn-sign-in').on('click', function(e) {
        var user = {
            username: $('#tb-username').val(),
            password: $('#tb-password').val()
        };

        data.signIn(user)
            .then(function(user) {
                toastr.success('User signed in!');
                context.redirect('#/home');
                setTimeout(function() {
                    $('#container-sign-in').fadeOut(100, function() {
                        $('#container-sign-out')
                            .fadeIn(500)
                            .find("h4")
                            .html("Hello, " + user.username);
                        $("#show-form").html(user.username);
                        if (user.credential !== "admin") {
                            $("#btn-list-users").hide();
                        } else {
                            $("#btn-list-users").show();
                        }
                    });
                }, 1000);
            }, function(err) {
                if (typeof err === "object") {
                    err = err.responseText;
                }
                context.redirect('#/');
                document.location.reload(true);
                toastr.error(err);
            });
    });
}

function signOut(context) {
    $('#btn-sign-out').on('click', function() {
        data.signOut()
            .then(function() {
                toastr.success('User signed out!');
                context.redirect('#/home');
                setTimeout(function() {
                    $('#container-sign-out').fadeOut(100, function() {
                        $('#container-sign-in').fadeIn(500);
                        $("#show-form").html(`<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> login`);
                    });
                }, 1000);
            })
            .then(() => {
                context.redirect('#/');
                document.location.reload(true);
            })
    });
}

function register(context) {
    $("#btn-back").on("click", () => $("#show-form").fadeIn());
    $('#btn-register').on('click', function() {
        const username = $('#tb-reg-username').val(),
            password = $('#tb-reg-password').val(),
            email = $('#tb-reg-email').val();
        const user = new User(username, password, email);

        data.register(user)
            .then(function() {
                toastr.success('User registered!');
                setTimeout(function() {
                    context.redirect('#/');
                    document.location.reload(true);
                }, 1000);
            }, function(err) {
                if (typeof err === "object") {
                    err = err.responseText;
                }
                toastr.error(err);
            });
    });
}

function deleteUser(context) {
    $(".delete-user").on("click", function(ev) {
        let username = $(ev.target).closest('tr').children("td.table-username").text();
        data.userDelete(username)
            .then(function() {
                toastr.error('User deleted!');
                setTimeout(function() {
                    context.redirect('#/users');
                    document.location.reload(true);
                }, 1000);
            }, function(err) {
                if (typeof err === "object") {
                    err = err.responseText;
                }
                toastr.error(err);
            });
    });
}

export {
    toggleMenu,
    signIn,
    signOut,
    register,
    deleteUser
}