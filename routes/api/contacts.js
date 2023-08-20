const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");

router.get("/", controller.getAllContacts);

router.get("/:contactId", controller.getContact);

router.post("/", controller.addNewContact);

router.delete("/:contactId", controller.delContact);

router.put("/:contactId", controller.editContact);

module.exports = router;

// const Joi = require("joi");

// const contacts = require("../../models/contacts");

// const { HttpError } = require("../../helpers");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     const emptyBody = Object.keys(req.body).length === 0;

//     if (emptyBody) {
//       throw HttpError(400, "missing fields");
//     }

//     if (error) {
//       throw HttpError(
//         400,
//         `missing required ${error.details[0].path[0]} field`
//       );
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({
//       message: "contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     const emptyBody = Object.keys(req.body).length === 0;

//     if (emptyBody) {
//       throw HttpError(400, "missing fields");
//     }

//     if (error) {
//       throw HttpError(
//         400,
//         `missing required ${error.details[0].path[0]} field`
//       );
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
