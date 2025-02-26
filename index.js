import express from "express";
const app = express();

app.get("/", (_, res) => {
    res.send("Server is running");
});

app.listen(7424, () => {
    console.log("server is running");
});