const router = require('express').Router();

router.get("/ping", (req, res) => {
    res.json({ response: "response is okay" });
});

module.exports = router;
