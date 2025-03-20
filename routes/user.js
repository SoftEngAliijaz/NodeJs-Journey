const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleGetUserByIdAndUpdate,
  handleGetUserByIdAndDelete,
  handleCreateNewUser,
} = require("../controllers/user");

///CODE
router.get("/", handleGetAllUsers).post("/", handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleGetUserByIdAndUpdate)
  .delete(handleGetUserByIdAndDelete);

module.exports = router;
