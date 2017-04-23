import * as handlebars from "handlebars";
import $ from "jquery";

const cache = {};

function get(name) {
    const promise = new Promise(function(resolve, reject) {
        if (cache[name]) {
            resolve(cache[name]);
            return;
        }
        let url = `templates/${name}.handlebars`;
        $.get(url, function(html) {
            let template = handlebars.compile(html);
            cache[name] = template;
            resolve(template);
        });
    });
    return promise;
}

export { get };