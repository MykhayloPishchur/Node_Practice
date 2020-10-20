const express = require("express");
const router = express.Router();
const {
  listContacts,
  findContact,
  addContacts,
  deleteContacts,
  patchContact,
} = require("./contact.controller");

router.get("/contacts", listContacts);
router.get("/contacts/:contactId", findContact);
router.post("/contacts", addContacts);
router.delete("/contacts/:contactId", deleteContacts);
router.patch("/contacts/:contactId", patchContact);

module.exports = router;
