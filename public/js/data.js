import CryptoJS from "crypto";
import * as validator from "validator";
import * as jsonRequester from "requester";

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-username',
    AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

const USERNAME_CHARS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_.",
    USERNAME_MIN_LENGTH = 3,
    USERNAME_MAX_LENGTH = 30;

/* Users */
function register(user) {
    var error = validator.validateString(user.username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_CHARS);

    if (error) {
        return Promise.reject(error.message);
    }

    var reqUser = {
        email: user.email,
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    return jsonRequester.post('api/users', {
            data: reqUser
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

function hasUser() {
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
        .then(function(res) {
            return res.result;
        });
}


export {
    register,
    signIn,
    signOut,
    hasUser,
    usersGet
};