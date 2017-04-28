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

export {
    register,
    signIn,
    signOut,
    currentUser,
    usersGet,
    userDelete
};