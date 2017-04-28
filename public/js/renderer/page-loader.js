import * as templates from "template-requester";
import * as createHandler from "event-handler";
import * as data from "data";

function loadHomePage(context) {
    templates.get("login")
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
        })
        // prepare data for home page template here
        .then(templates.get("home")
            .then(template => {
                context
                    .$element()
                    .find("#main-content")
                    .html(template());
                $("#all-posts-sortable").sortable();
            })
        );
}

function loadRegisterMenu(context) {
    templates.get('register')
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

function loadUsersList(context) {
    data.usersGet()
        .then(data => {
            templates.get('list-users')
                .then(function(template) {
                    context
                        .$element()
                        .find("#main-content")
                        .html(template({ data }));
                    console.log(data);
                    return context;
                })
                .then(context => {
                    createHandler.deleteUser(context);
                })
        })
}

export {
    loadHomePage,
    loadRegisterMenu,
    loadUsersList
};