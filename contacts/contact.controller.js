const contactModel = require("./contacts.model");
const { validation } = require("./contact.validation");

async function listContacts(req, res, next) {
  try {
    const contact = await contactModel.find();
    return res.status(201).json(contact);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function findContact(req, res, next) {
  const {
    params: { contactId },
  } = req;

  try {
    const contact = await contactModel.findById(contactId);
    if (contact.length === 0) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send(contact);
  } catch (err) {
    next(err);
  }
}

async function addContacts(req, res, next) {
  const { error } = validation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const contact = await contactModel.create(req.body);
    return res.status(201).json(contact);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteContacts(req, res, next) {
  const {
    params: { contactId },
  } = req;

  try {
    const contact = await contactModel.findByIdAndDelete(contactId);
    if (contact) {
      return res.status(200).json({ message: "contact deleted" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (err) {
    console.log(err.message);
  }
}

async function patchContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const contact = await contactModel.findByIdAndUpdate(contactId, {
      $set: req.body,
    });

    if (!contact) {
      res.status(404).send({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  findContact,
  addContacts,
  deleteContacts,
  patchContact,
};
