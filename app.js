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
api.get("/api/users", (req, res) => {
        const user = db.get("users")
            .find({ id: req.params.id })
            .value()

        res.send(user);
    })
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