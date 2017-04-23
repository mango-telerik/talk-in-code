const express = require("express")
const low = require("lowdb")
const bodyParser = require('body-parser')
const fileAsync = require("lowdb/lib/storages/file-async")

// Create server
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Start database using file-async storage
// For ease of use, read is synchronous
const db = low("./data/db.json", {
    //storage: fileAsync
})

// Routes
// GET /api/users
const usersController = require("./controllers/users-controller")(db);
// authorize user first

app.use('/api', function(req, res, next) {
    console.log(req.headers);
    var authKey = req.headers['x-auth-key'];
    req.user = db.get('users').find({
        authKey: authKey
    }).value();
    next();
});

app.get("/api/users", usersController.get);

// POST /api/users
app.post("/api/users", usersController.post);

// PUT /api/login
app.put("/api/auth", usersController.put);

// Init
let port = 3000;
db.defaults({ users: [], posts: [] }).write();
app.listen(port, () => console.log("Server is running at http://localhost:" + port));