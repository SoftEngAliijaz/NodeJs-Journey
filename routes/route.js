const express = require('express');
const router = express.Router();

router.get("/getUser", (req, res) => {
    const user = {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@gmail.com"
    };

    res.json(user);
});

router.post("/addSomething", (req, res) => {
    console.log("Request Body:", req.body);
    const request = req.body;

    if (request.username) {
        res.json(request);
    } else {
        res.status(400).json({ "Error": "Not Allowed" });
    }

});


router.patch("/pingpong", (req, res) => {
    const request = req.body;

    if (request._username === "user") {
        res.json({ "response": "Success!" });
    } else {
        res.status(400).json({ "Error": "Not Allowed" });
    }
});

module.exports = router;
