const path = require("path");
const fs = require("fs");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "../../db/contacts.json");

exports.listContacts = () =>
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
  });

exports.getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    JSON.parse(data).find((item) => item.id === contactId);
  });
};

exports.removeContact = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    const contacts = JSON.parse(data);

    if (err) throw err;
    const editedList = contacts.filter((item) => item.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(editedList), (err) => {
      if (err) throw err;
    });
  });
};

exports.addContact = (name, email, phone) => {
  const id = shortid.generate();
  const newContact = { id, name, email, phone };

  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const editedList = JSON.stringify(
      data ? [...JSON.parse(data), newContact] : [newContact]
    );

    fs.writeFile(contactsPath, editedList, (err) => {
      if (err) throw err;
    });
  });
};

exports.updateContact = (contactId, data) => {
  const contacts = require(contactsPath);
  const contactToFind = listContacts().find((item) => item.id === contactId);

  contacts[contactToFind] = {
    ...contacts[contactToFind],
    ...data,
  };

  fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
    if (err) throw err;
  });
};
