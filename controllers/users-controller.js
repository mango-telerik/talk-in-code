module.exports = function(db) {

    const keygen = require("keygenerator");
    const AUTH_KEY_LENGTH = 30;

    function validate(user) {

    }

    function generateAuthKey(userId) {
        // TODO: validate Id
        let authKey = keygen._({
            specials: false,
            length: AUTH_KEY_LENGTH
        });

        return userId + authKey;
    }

    ////// GET \\\\\\
    // returns to server all users from db
    function get(req, res) {

        let user = req.user;

        if (!user) {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        const users = db.get("users")
            .map(function(user) {
                return {
                    username: user.username,
                    email: user.email,
                    posts: user.posts,
                    comments: user.comments,
                    credential: user.credential,
                    id: user.id
                };
            }).value();

        res.json({
            result: users
        });
    }

    ////// POST \\\\\\
    // adds a new user to db
    function post(req, res) {
        let user = req.body;

        if (!user || typeof user.username !== 'string' || typeof user.passHash !== 'string') {
            res.status(400)
                .json('Invalid user');
            return;
        }

        /*// TODO: implement validation
        let error = validate(user);

        if (error) {
            res.status(400)
                .json(error.message);
            return;
        }*/

        let dbUser = db.get('users').find({
            usernameToLower: user.username.toLowerCase()
        }).value();

        if (dbUser) {
            res.status(400)
                .json('Duplicated user');
            return;
        }

        user.usernameToLower = user.username.toLowerCase();

        db.get("users")
            .push(req.body)
            .last()
            .assign({ id: Date.now() })
            .write();

        res.status(201).json({
            result: {
                username: user.username
            }
        });
    }

    ////// PUT \\\\\\
    // verify and return authKey for a user 
    function put(req, res) {
        let reqUser = req.body;
        let user = db.get("users").find({
            usernameToLower: reqUser.username.toLowerCase()
        }).value();
        if (!user || user.passHash !== reqUser.passHash) {
            res.status(404)
                .json('Invalid username or password');
            return;
        }
        if (!user.authKey) {
            user.authKey = generateAuthKey(user.id);
            db.write();
        }

        res.json({
            result: {
                username: user.username,
                authKey: user.authKey,
                credential: user.credential
            }
        });
    }

    ////// DELETE \\\\\\
    function deleteUser(req, res) {
        let user = req.user;

        if (!user || user.credential !== "admin") {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        db.get("users")
            .remove({ id: req.params.id })
            .write();
    }

    return {
        get,
        post,
        put,
        deleteUser
    };
}