const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
    res.send("Server is connected and running on http://localhost:1122");
});

const routes = require("./routes/route");
app.use("/api/routes", routes);

app.listen(1122, () => {
    console.log("Server is running on http://localhost:1122");
});