import * as templates from "templates";
import $ from "jquery";

function all(context) {
    $("#main-nav-panel").show();
    templates.get("home")
        .then(function(template) {
            context.$element().html(template());
        });
}

export { all };