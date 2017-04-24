import * as data from "data";
import $ from "jquery";
import * as toastr from "toastr";
import Sammy from "sammy";
import * as users from "users";
import * as home from "home";

var sammyApp = Sammy('#content', function() {

    this.get('#/', function(context) {
        context.redirect('#/home');
        //document.location.reload(true);
    });

    this.get('#/home', home.all);

    this.get('#/register', function(context) {
        context.redirect('#/sign-up');
    });

    this.get('#/users/register', function(context) {
        context.redirect('#/sign-up');
    });
    this.get('#/sign-up', users.register);
});

$(function() {
    sammyApp.run('#/');

    /*
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
                    document.location = '#/home';
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
                    document.location = '#/home';
                    setTimeout(function() {
                        $('#container-sign-in').fadeOut(100, function() {
                            $('#container-sign-out').fadeIn(500);
                        });
                    }, 1000);
                }, function(err) {
                    toastr.error(err.responseText);
                });
        });
        */
});