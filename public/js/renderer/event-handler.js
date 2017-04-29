import * as data from "data";
import User from "userObj";
import Post from "postObj";

function toggleMenu() {
    $("body").on("click", "#show-form", () => $("#login-panel").slideDown(400, () => {
        $("#show-form").fadeOut();
    }));
    $("body").on("click", "#hide-form", () => $("#login-panel").slideUp(400, () => {
        $("#show-form").fadeIn();
    }));

    if (data.currentUser()) {
        $("#container-sign-in").hide();
    } else {
        $("#container-sign-out").hide();
}
}

function signIn(context) {
    $("body").on("click", "#btn-sign-in", () => {
        var user = {
            username: $("#tb-username").val(),
            password: $("#tb-password").val()
        };

        data.signIn(user)
            .then(function(user) {
                toastr.success("User signed in!");
                context.redirect("#/home");
                setTimeout(function() {
                    $("#container-sign-in").fadeOut(100, function() {
                        $("#container-sign-out")
                            .fadeIn(500)
                            .find("h4")
                            .html("Hello, " + user.username);
                        $("#show-form").html(user.username);
                        if (user.credential !== "admin") {
                            $("#btn-list-users").hide();
                            $("#btn-go-home").hide();
                        } else {
                            $("#btn-list-users").show();
                            $("#btn-go-home").hide();
                        }
                    });
                }, 1000);
            }, function(err) {
                if (typeof err === "object") {
                    err = err.responseText;
                }
                // context.redirect("#/");
                // document.location.reload(true);
                toastr.error(err);
            });
    });

    $("body").on("click", "#btn-list-users", () => {
        $("#btn-list-users").hide();
        $("#btn-go-home").show();
        // $("#login-panel").slideUp(400, () => {
        //     $("#show-form").fadeIn();
        // })
    });

    $("body").on("click", "#btn-go-home", () => {
        $("#btn-go-home").hide();
        $("#btn-list-users").show();
        // $("#login-panel").slideUp(400, () => {
        //     $("#show-form").fadeIn();
        // })
    });

}

function signOut(context) {
    $("body").on("click", "#btn-sign-out", () => {
        data.signOut()
            .then(function() {
                toastr.success("User signed out!");
                context.redirect("#/home");
                setTimeout(function() {
                    $("#container-sign-out").fadeOut(100, function() {
                        $("#container-sign-in").fadeIn(500);
                        $("#show-form").html(`<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> login`);
                    });
                }, 1000);
            })
            .then(() => {
                context.redirect("#/");
                document.location.reload(true);
            })
    });
}

function register(context) {
    $("body").on("click", "#btn-register", function() {
        const username = $("#tb-reg-username").val(),
            password = $("#tb-reg-password").val(),
            email = $("#tb-reg-email").val();
        const user = new User(username, password, email);

        data.register(user)
            .then(function() {
                toastr.success("User registered!");
                setTimeout(function() {
                    context.redirect("#/");
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
    $("body").on("click", ".delete-user", function(ev) {
        let username = $(ev.target).closest("tr").children("td.table-username").text();
        data.userDelete(username)
            .then(function() {
                toastr.success("User " + username + " deleted!");
                setTimeout(function() {
                    context.redirect("#/users");
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
function publish(context) {
    $("body").on("click", "#create-new-post-request-button", function(ev){
        var title;

        $( "input" )
            .keyup(function() {
                title = $( this ).val();
                $( "#tb-thread-title" ).text( title );
            })
            .keyup();
        console.log(title);
       // text = $('#post-content-field').tinyMCE().getContent();

        const
            text = "New pst",
                //$("#post-content-field").text(),
            author = "Pesho",
            likes = 0,
            category = "2";

        const newPost = new Post(author, text, likes, title, category);
        context.redirect("#/");
        // data.postPost(newPost)
        //     .then(function () {
        //         toastr.success("You have published new post!");
        //         setTimeout(function () {
        //      context.redirect("#/");
        //             document.location.reload(true);
        //         }, 1000);
        //     }, function (err) {
        //         if (typeof err === "object") {
        //             err = err.responseText;
        //         }
        //         toastr.error(err);
        //     });
        });
}
export {
    toggleMenu,
    signIn,
    signOut,
    register,
    deleteUser,
    publish
}