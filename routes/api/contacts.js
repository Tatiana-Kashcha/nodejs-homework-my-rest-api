const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const { validateData, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", controller.getAllContacts);

router.get("/:contactId", isValidId, controller.getContact);

router.post("/", validateData(schemas.addSchema), controller.addNewContact);

// router.delete("/:contactId", isValidId, controller.delContact);

router.put(
  "/:contactId",
  isValidId,
  validateData(schemas.addSchema),
  controller.editContact
);

module.exports = router;
