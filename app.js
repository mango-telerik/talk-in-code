const express = require("express")
const low = require("lowdb")
const fileAsync = require("lowdb/lib/storages/file-async")

// Create server
const app = express()

// Start database using file-async storage
// For ease of use, read is synchronous
const db = low("./data/db.json", {
    storage: fileAsync
})

// Routes
// GET /api/users
const usersController = require("./controllers/users-controller")(db);
api.get("/api/users", user - controller.get);
// PUT /api/users
api.put("/api/users", (req, res) => {
        db.get("users")
            .push(req.body)
            .last()
            .assign({ id: Date.now() })
            .write()
            .then(user => res.send(user));
    })
    // POST /api/login


// Init
let port = 3000;
db.defaults({ users: [], posts: [] })
    .write()
    .then(() => app.listen(port, () => console.log("Server is running at http://localhost:" + port)));