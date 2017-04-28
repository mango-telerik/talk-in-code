module.exports = function(db) {
    //------- GET --------
    // returns unique categories
    function get(req, res) {
        let user = req.user;

        if (!user) {
            res.status(401)
                .json("Unauthorized user!");
            return;
        }

        const categories = db.get("posts")
            .sortBy('likes')
            .map(post => post.category)
            .value()
            .filter((cat, i, arr) => arr.indexOf(cat) === i);

        res.status(200).json({
            result: {
                categories
            }
        });
    }

    return {
        get
    };
};