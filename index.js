const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();

const PORT = 8080;

///show welcome message
app.get("/", (req, res) => {
    return res.send("Welcome to NodeJs Journey");
});

/// get all users list
app.get("/api/getAllUsers", (req, res) => {
    return res.json(users);
});

/// post new user
app.post("/api/users", (req, res) => {
    return res.json({ status: "Pending" });
});

/// specify operations
app.route("/api/getAllUsers/:id")
    .get((req, res) => {
        const id = Number(req.params.id);

        /// check if its a number or not
        if (isNaN(id)) {
            res.status(404).json({ status: 404, message: "Invalid ID" });
        }

        const user = users.find((user) => user.id === id);

        /// now find and show result
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ status: 404, message: "User Not Found" });
        }
    })
    .patch((req, res) => {
        return res.status(501).json({ status: 501, message: "PATCH is Not Implemented Yet" });
    })
    .delete((req, res) => {
        return res.status(501).json({ status: 501, message: "DELETE is Not Implemented Yet" });
    });

app.listen(PORT, () => {
    console.log("Server is Listening on:" + PORT);
});
