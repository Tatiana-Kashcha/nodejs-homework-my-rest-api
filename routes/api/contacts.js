const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const { validateData } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", controller.getAllContacts);

// router.get("/:contactId", controller.getContact);

router.post("/", validateData(schemas.addSchema), controller.addNewContact);

// router.delete("/:contactId", controller.delContact);

// router.put(
//   "/:contactId",
//   validateData(schemas.addSchema),
//   controller.editContact
// );

module.exports = router;
