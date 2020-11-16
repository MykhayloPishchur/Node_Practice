const express = require("express");
const router = express.Router();
const contactsController = require("./contact.controller");

router.get("/contacts", contactsController.listContacts);
router.get("/contacts/:contactId", contactsController.findContact);
router.post("/contacts", contactsController.addContacts);
router.delete("/contacts/:contactId", contactsController.deleteContacts);
router.patch("/contacts/:contactId", contactsController.patchContact);

module.exports = router;
