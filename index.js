const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 8080;

/// Connection
mongoose
  .connect("mongodb://localhost:27017/nodejs-journey", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

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
app.get("/api/users", async (req, res) => {
  const getAllUsers = await User.find({});
  return res.json(getAllUsers);
});

app.get("/users", async (req, res) => {
  try {
    const getAllUsers = await User.find({});

    const html = `
    <ul>
      ${getAllUsers
        .map(
          (user) =>
            `<li>${user.first_name}${user.last_name} - ${user.email}</li>`
        )
        .join("")}
    </ul>
    `;

    res.status(200).send(html);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/// Create a new user
app.post("/api/user", async (req, res) => {
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

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log(`resut is ${result}`);
  return res.status(201).json({ message: "User Created Successfully" });
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, response) => {
  //   return res.status(201).json({ status: "Success", id: users.length });
  // });
});

/// Specify operations for a single user
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ status: 404, message: "User Not Found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal Server Error" });
    }
  })
  .patch(async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ status: 404, message: "User Not Found" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal Server Error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ status: 404, message: "User Not Found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "User Deleted Successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal Server Error" });
    }
  });

app.listen(PORT, () => {
  console.log("Server is Listening on:" + PORT);
});
