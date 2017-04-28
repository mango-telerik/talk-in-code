import * as loader from "page-loader";

var sammyApp = Sammy('#content', function() {
    this.get('#/', context => context.redirect('#/home'));
    this.get('#/home', context => loader.loadHomePage(context));
    this.get('#/sign-up', context => loader.loadRegisterMenu(context));
    this.get('#/register', context => context.redirect('#/sign-up'));
    this.get('#/users', context => loader.loadUsersList(context));
    this.get('#/users/register', context => context.redirect('#/sign-up'));
});

export { sammyApp };