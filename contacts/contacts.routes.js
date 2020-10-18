const express = require("express");
const userRouter = express.Router();
const {
  listContacts,
  findContact,
  addContacts,
  deleteContacts,
  patchContact,
} = require("./contact.controller");

userRouter.get("/contacts", listContacts);
userRouter.get("/contacts/:contactId", findContact);
userRouter.post("/contacts", addContacts);
userRouter.delete("/contacts/:contactId", deleteContacts);
userRouter.patch("/contacts/:contactId", patchContact);

module.exports = userRouter;
