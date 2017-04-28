module.exports = function(db) {
    //------ GET -------
    // returns to server all posts from db
    function get(req, res) {

        let user = req.user;

        if (!user) {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        const posts = db.get("posts")
            .map(function(post) {
                return {
                    title: post.title,
                    author: { username: post.author.username },
                    category: post.category,
                    comments: post.comments,
                    lies: post.likes,
                    id: post.id
                };
            }).value();

        res.json({
            result: posts
        });
    }

    //------ POST ------
    // adds a new post to db
    function post(req, res) {
        let user = req.user;

        if (!user) {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        db.get("posts")
            .push(req.body)
            .last()
            .assign({ id: Date.now() })
            .write();

        res.status(201).json({
            result: {
                title: req.body.title
            }
        });
    }

    //------ UPDATE -------
    // modify a post
    function put(req, res) {
        let user = req.user;

        if (!user || user.credential !== "admin") {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        let updatedPost = db.get("posts").find({ id: +req.params.id }).value().title;
        db.get("users")
            .assign({ title: req.body.title })
            .assign({ content: req.body.content })
            .write();

        res.status(200)
            .json("Success! Post with title " + deletedPost + " is updated");
        return;
    }

    //------ DELETE -------
    function deletePost(req, res) {
        let user = req.user;

        if (!user || user.credential !== "admin") {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        let deletedPost = db.get("posts").find({ id: +req.params.id }).value().title;
        db.get("users")
            .remove({ id: +req.params.id })
            .write();

        res.status(200)
            .json("Success! Post with title " + deletedPost + " was deleted");
        return;
    }

    return {
        get,
        post,
        put,
        deletePost
    };
};