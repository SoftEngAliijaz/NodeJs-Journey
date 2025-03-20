const express = require("express");
const { connectDatabase } = require("./config");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8080;

connectDatabase("mongodb://localhost:27017/nodejs-journey");

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("Server is Listening on:" + PORT);
});
