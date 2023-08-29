const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const {
  validateData,
  isValidId,
  validateStatus,
} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", controller.getAllContacts);

router.get("/:contactId", isValidId, controller.getContactById);

router.post("/", validateData(schemas.addSchema), controller.addContact);

router.delete("/:contactId", isValidId, controller.delContact);

router.put(
  "/:contactId",
  isValidId,
  validateData(schemas.addSchema),
  controller.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateStatus(schemas.updateFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
