const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const schemas = require("../schemas/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    const emptyBody = Object.keys(req.body).length === 0;
    const missingField =
      schemas.addSchema._ids._byKey.size !== Object.keys(req.body).length;

    console.log(missingField);
    console.log(schemas.addSchema._ids._byKey.size);
    console.log(Object.keys(req.body).length);

    if (emptyBody) {
      throw HttpError(400, "missing fields");
    }

    if (error) {
      if (missingField) {
        throw HttpError(
          400,
          `missing required ${error.details[0].path[0]} field`
        );
      } else {
        throw HttpError(400, error.message);
      }
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const delContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const editContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    const emptyBody = Object.keys(req.body).length === 0;
    const missingField =
      schemas.addSchema._ids._byKey.size !== Object.keys(req.body).length;

    if (emptyBody) {
      throw HttpError(400, "missing fields");
    }

    if (error) {
      if (missingField) {
        throw HttpError(
          400,
          `missing required ${error.details[0].path[0]} field`
        );
      } else {
        throw HttpError(400, error.message);
      }
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  addNewContact,
  delContact,
  editContact,
};
