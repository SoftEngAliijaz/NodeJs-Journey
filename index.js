const express = require("express");
const app = express();

app.get("/", (_, res) => {
    res.send("Server is connected and running on http://localhost:1122");
});

app.listen(1122, () => {
    console.log("Server is running on http://localhost:1122");
});


const routes = require("./routes/route");

app.use("/routes", routes)