const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

const PORT = 8080;

/// Middleware - PLUGIN (LET ASSUME AS PLUGIN)
app.use(express.urlencoded({ urlencoded: false }));

/// Show welcome message
app.get("/", (req, res) => {
  return res.send("Welcome to NodeJs Journey");
});

app.use((req, res, next) => {
  console.log("Hi from MiddleWare 1");
  next();
});

/// if you want to end the middleware res or req anywhere
/// you can using res.end that will stop to go further

app.use((req, res, next) => {
  console.log("Hi from MiddleWare 2");
  next();
});

/// every middleware have it's own work to do
/// this is checking and storing IP, METHOD, PATH, BODY IN LOG.TXT FILE
app.use((req, res, next) => {
  const logEntry = `
        IP: ${req.ip},
        METHOD: ${req.method},
        PATH: ${req.path},
        BODY: ${JSON.stringify(req.body)},
    `;
  fs.appendFile("log.txt", logEntry, (error, data) => {
    next();
  });
});

/// Get all users list
app.get("/api/users", (req, res) => {
  return res.json(users);
});

/// Create a new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, response) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

/// Specify operations for a single user
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);

    /// Check if it's a number or not
    if (isNaN(id)) {
      res.status(404).json({ status: 404, message: "Invalid ID" });
    }

    const user = users.find((user) => user.id === id);

    /// Now find and show result
    if (user) {
      return res.status(200).json(user);
    } else if (!user) {
      return res.status(404).json({ status: 404, message: "User Not Found" });
    } else {
      return res.status(404).json({ status: 404, message: "User Not Found" });
    }
  })
  .patch((req, res) => {
    return res
      .status(501)
      .json({ status: 501, message: "PATCH is Not Implemented Yet" });
  })
  .delete((req, res) => {
    return res
      .status(501)
      .json({ status: 501, message: "DELETE is Not Implemented Yet" });
  });

app.listen(PORT, () => {
  console.log("Server is Listening on:" + PORT);
});
