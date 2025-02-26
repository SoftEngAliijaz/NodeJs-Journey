const { log } = require("console");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(7424, () => {
    console.log("servve is ");
});