const express = require("express");
const low = require("lowdb");
const bodyParser = require('body-parser');
const fileAsync = require("lowdb/lib/storages/file-async");

// Create server
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));


// File async storage
const db = low("./data/db.json", {
    storage: fileAsync
});

// Routes
// authorize user first

app.use('/api', function(req, res, next) {
    var authKey = req.headers['x-auth-key'];
    req.user = db.get('users').find({
        authKey: authKey
    }).value();
    next();
});

// Users
const usersController = require("./controllers/users-controller")(db);
app.get("/api/users", usersController.get);
app.post("/api/users", usersController.post);
app.put("/api/auth", usersController.put);
app.delete("/api/users/:id", usersController.deleteUser);

// Posts
const postsController = require("./controllers/posts-controller")(db);
app.get("/api/posts", postsController.get);
app.post("/api/posts", postsController.post);
app.put("/api/posts/:id", postsController.put);
app.delete("/api/posts/:id", postsController.deletePost);


// Comments
const commentsController = require("./controllers/comments-controller")(db);
app.get("/api/posts/:id/messages", commentsController.get);
app.post("/api/posts/:id/messages", commentsController.post);
app.delete("/api/posts/:id/messages/:mesid", commentsController.deleteComm);

// Categories
const categoryController = require("./controllers/category-controller")(db);
app.get("/api/categories", categoryController.get);

// Init
let port = 3000;
db.defaults({ users: [], posts: [] }).write();
app.listen(port, () => console.log("Server is running at http://localhost:" + port));