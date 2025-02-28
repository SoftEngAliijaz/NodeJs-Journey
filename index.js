const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
    res.send("Server is connected and running on http://localhost:1111");
});

const userRoutes = require("./routes/user_route");
app.use("/api/users", userRoutes);

app.listen(1111, () => {
    console.log("Server is running on http://localhost:1111");
});