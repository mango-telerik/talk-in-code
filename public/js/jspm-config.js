System.config({
    baseURL: "./public",
    defaultJSExtensions: true,
    transpiler: "babel",
    babelOptions: {
        "optional": [
            "runtime",
            "optimisation.modules.system"
        ]
    },
    paths: {
        "github:*": "./jspm_packages/github/*",
        "npm:*": "./jspm_packages/npm/*"
    },

    map: {
        "babel": "npm:babel-core@5.8.38",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "core-js": "npm:core-js@1.2.7",
        "github:jspm/nodelibs-assert@0.1.0": {
            "assert": "npm:assert@1.4.1"
        },
        "github:jspm/nodelibs-buffer@0.1.1": {
            "buffer": "npm:buffer@5.0.6"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.2": {
            "process": "npm:process@0.11.9"
        },
        "github:jspm/nodelibs-util@0.1.0": {
            "util": "npm:util@0.10.3"
        },
        "github:jspm/nodelibs-vm@0.1.0": {
            "vm-browserify": "npm:vm-browserify@0.0.4"
        },
        "npm:assert@1.4.1": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.1",
            "process": "github:jspm/nodelibs-process@0.1.2",
            "util": "npm:util@0.10.3"
        },
        "npm:babel-runtime@5.8.38": {
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:buffer@5.0.6": {
            "base64-js": "npm:base64-js@1.2.0",
            "ieee754": "npm:ieee754@1.1.8"
        },
        "npm:core-js@1.2.7": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.2",
            "systemjs-json": "github:systemjs/plugin-json@0.1.2"
        },
        "npm:inherits@2.0.1": {
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:process@0.11.9": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "vm": "github:jspm/nodelibs-vm@0.1.0"
        },
        "npm:util@0.10.3": {
            "inherits": "npm:inherits@2.0.1",
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:vm-browserify@0.0.4": {
            "indexof": "npm:indexof@0.0.1"
        },

        // bower modules
        //"jquery": "../bower_components/jquery/dist/jquery.min.js",
        //"sammy": "../bower_components/sammy/lib/sammy.js",
        //"toastr": "../bower_components/toastr/toastr.min.js",
        //"jquery-ui": "../bower_components/jquery-ui/jquery-ui.min.js",
        //"handlebars": "../bower_components/handlebars/handlebars.min.js",
        //"moment": "../bower_components/moment/moment.js",
        //"crypto": "../bower_components/crypto-js/crypto-js.js",

        // local modules
        "main": "./js/main.js",
        "router": "./js/routing.js",
        "validator": "./js/helpers/validator.js",
        "constants": "./js/helpers/constants.js",
        "data": "./js/data.js",
        "requester": "./js/requesters/json-requester.js",
        "template-requester": "./js/requesters/template-requester.js",
        "page-loader": "./js/renderer/page-loader.js",
        "event-handler": "./js/renderer/event-handler.js",
        "userObj": "./js/models/user",
        "elementObj": "./js/models/element.js",
        "categoryObj": "./js/models/category.js",
        "postObj": "./js/models/post.js",
        "commentObj": "./js/models/comment.js"
    }
});