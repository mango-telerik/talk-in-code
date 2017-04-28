module.exports = function(params) {
    //-------- GET ---------
    // get all comments for post with provided id
    function get(req, res) {
        let user = req.user || "anonymos";

        const comments = db.get("posts")
            .find({ id: +req.params.id })
            .get("comments")
            .map(c => {
                return {
                    author: c.author,
                    content: c.content,
                    likes: c.likes,
                    label: c.label
                };
            })
            .value();

        res.status(200).json({
            result: comments
        });
    }

    //------- POST ---------
    // add a new comment to post with provided id
    function post(res, req) {
        let user = req.user;

        if (!user) {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        comments = db.get("posts")
            .find({ id: +req.params.id })
            .get("comments")
            .push(req.body)
            .last()
            .assign({ id: Date.now() })
            .write();

        db.get("users")
            .find({ usernameToLower: user.username.toLowerCase() })
            .assign({ comments: (+user.comments + 1) })
            .write();

        res.status(201).json("Comment added successfully!");
        return;
    }

    //-------- DELETE --------
    // deletes comment with selected id from post with selected id
    function deleteComm(res, req) {
        let user = req.user;

        if (!user) {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        const comments = db.get("posts")
            .find({ id: +req.params.id })
            .get("comments")
            .remove({ id: +req.params.mesid })
            .write();

        res.status(200)
            .json("Success! Comment was deleted");
        return;
    }

    return {
        get,
        post,
        deleteComm
    }
};