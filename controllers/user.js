const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
}

async function handleGetUserById(req, res) {
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
}

async function handleGetUserByIdAndUpdate(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ status: 404, message: "User Not Found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
}

async function handleGetUserByIdAndDelete(req, res) {
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
}

async function handleCreateNewUser(req, res) {
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
  return res
    .status(201)
    .json({ message: "User Created Successfully", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleGetUserByIdAndUpdate,
  handleGetUserByIdAndDelete,
  handleCreateNewUser,
};
