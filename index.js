const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();

const PORT = 8080;

app.get("/api/getAllUsers", (req, res) => {
    return res.json(users);
});

app.route("/api/getAllUsers/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "Pending" });
    });

app.post("/api/users", (req, res) => {
    return res.json({ status: "Pending" });
});

app.listen(PORT, () => {
    console.log("Server is Listening on:" + PORT);
});
