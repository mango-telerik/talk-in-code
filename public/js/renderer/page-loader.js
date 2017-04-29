import * as templates from "template-requester";
import * as createHandler from "event-handler";
import * as data from "data";


function loadHomePage(context) {
    /*templates.get("login")
        .then(template => {
            context
                .$element()
                .find("#form-field")
                .html(template());
        })
        .then(() => {
            createHandler.toggleMenu();
            createHandler.signOut(context);
            createHandler.signIn(context);
        })*/
    // prepare data for home page template here
    data.getPosts()
        .then(data => templates.get("home")
            .then(template => {
                context
                    .$element()
                    .find("#main-content")
                    .html(template({ data }));
                $("#all-posts-sortable").sortable();
                return context;
            })
            .then(context => {
                createHandler.toggleMenu();
                createHandler.signOut(context);
                createHandler.signIn(context);
                createHandler.register(context);
            })
        );
}

/*
function loadLoginMenu(context) {
    templates.get("login")
        .then(function(template) {
            context
                .$element()
                .find("#form-field")
                .html(template());
            return context;
        })
        .then(context => {
            createHandler.register(context);
        })
}

function loadRegisterMenu(context) {
    templates.get("register")
        .then(function(template) {
            context
                .$element()
                .find("#form-field")
                .html(template());
            return context;
        })
        .then(context => {
            createHandler.register(context);
        })
}
*/

function loadLoginMenu(context) {
    $("#register-panel").hide();
    $("#login-panel").show();
    return context;
}


function loadRegisterMenu(context) {
    $("#login-panel").hide();
    $("#register-panel").show();
    return context;
}

function loadUsersList(context) {
    data.usersGet()
        .then(data => {
            templates.get("list-users")
                .then(function(template) {
                    context
                        .$element()
                        .find("#main-content")
                        .html(template({ data }));
                    return context;
                })
                .then(context => {
                    createHandler.deleteUser(context);
                });
        });
}
        function loadCreatePost(context) {
    const author = localStorage.getItem('signed-in-user-username');
            data.usersGet()
                .then(data => {
                    templates.get("create-post")
                        .then(function(template) {
                            context
                                .$element()
                                .find("#main-content")
                                .html(template({ data }));
                            return context;
                        })
                        .then(context => {
                            createHandler.publish(context);
                        });
                })

        }

//             $('#create-new-post-request-button').on('click', function() {
//                 var text = $('#tb-msg-text').val();
//                 data.threads.addMessage(threadId, {
//                     text
//                 }).then(function(res) {
//                     console.log(res);
//                     context.redirect('#/threads/' + threadId);
//                 });
//
//
// }

export {
    loadHomePage,
    loadRegisterMenu,
    loadUsersList,
    loadLoginMenu,
    loadCreatePost
};