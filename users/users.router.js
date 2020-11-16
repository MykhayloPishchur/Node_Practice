const express = require("express");
const userRouter = express.Router();
const UserController = require("./users.controller");
const { avatarUpdate } = require("../auxiliaries/avatarUpdate");
const { authorize } = require("../auxiliaries/authorize");
const user = new UserController();

userRouter.get("/current", authorize, user.getCurrentUser);
userRouter.patch(
  "/avatar",
  authorize,
  avatarUpdate().single("avatar"),
  user.updateAvatar
);

module.exports = userRouter;
