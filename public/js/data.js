import * as validator from "validator";
import * as jsonRequester from "requester";
import User from "userObj";
import {
    USERNAME_CHARS,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH
} from "constants";

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

/* Users */
function register(reqUser) {
    const message = reqUser.errors;
    console.log(reqUser);
    console.log(message);
    if (message) {
        return Promise.reject(message.join("<br/>"));
    }

    return jsonRequester.post('api/users', {
            data: {
                username: reqUser.username,
                passHash: reqUser.passHash,
                email: reqUser.email,
                posts: 0,
                comments: 0,
                credential: reqUser.credential
            }
        })
        .then(function(resp) {
            var user = resp.result;
            return {
                username: resp.result.username
            };
        });
}

function signIn(user) {
    var error = validator.validateString(user.username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_CHARS);

    if (error) {
        return Promise.reject(error.message);
    }

    var reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    var options = {
        data: reqUser
    };

    return jsonRequester.put('api/auth', options)
        .then(function(resp) {
            var user = resp.result;
            localStorage.setItem(USERNAME_LOCAL_STORAGE_KEY, user.username);
            localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, user.authKey);
            return user;
        });
}

function signOut() {
    var promise = new Promise(function(resolve, reject) {
        localStorage.removeItem(USERNAME_LOCAL_STORAGE_KEY);
        localStorage.removeItem(AUTH_KEY_LOCAL_STORAGE_KEY);
        resolve();
    });
    return promise;
}

function currentUser() {
    return !!localStorage.getItem(USERNAME_LOCAL_STORAGE_KEY) &&
        !!localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY);
}


function usersGet() {
    var options = {
        headers: {
            'x-auth-key': localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY)
        }
    };
    return jsonRequester.get('api/users', options)
        .then(res => {
            return res.result;
        });
}



function userDelete(username) {
    usersGet()
        .then(res => {
            return res.result.find(x => x.username === username).id;
        })
        .then(id => {
            var options = {
                headers: {
                    'x-auth-key': localStorage.getItem(AUTH_KEY_LOCAL_STORAGE_KEY)
                }
            };
            return jsonRequester.delete('api/users' + id, options);
        })
}

function getPosts() {
    // hardcoded posts for test
    const posts = [{
            title: "What is Javascript",
            author: { username: "admin" },
            category: "JavaScript",
            content: "JavaScript is a programming language that allows you to implement complex things on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, or interactive maps, or animated 2D/3D graphics, or scrolling video jukeboxes, etc.",
            comments: [{
                    author: { username: "gosho" },
                    content: "I like your post very much!"
                },
                {
                    author: { username: "pesho" },
                    content: "This is a stupid post!"
                }
            ],
            likes: 12,
        },
        {
            title: "Some info about CSS",
            author: { username: "gosho" },
            category: "CSS",
            content: "Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language.[1] Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.",
            comments: [{
                    author: { username: "admin" },
                    content: "Stop writing useless posts!"
                },
                {
                    author: { username: "pesho" },
                    content: "This is the best post I've read!"
                },
                {
                    author: { username: "ivan" },
                    content: "Just spamming!"
                }
            ],
            likes: 31,
        }
    ]
    return Promise.resolve(posts);
}

export {
    register,
    signIn,
    signOut,
    currentUser,
    usersGet,
    userDelete,
    getPosts
};