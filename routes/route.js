const router = require('express').Router();

router.get("/getUser", (req, res) => {
    const user = {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@gmail.com"
    };

    res.json(user);
});

module.exports = router;
