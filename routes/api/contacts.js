const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const {
  validateData,
  isValidId,
  validateStatus,
  authenticate,
} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", authenticate, controller.getAllContacts);

router.get("/:contactId", authenticate, isValidId, controller.getContactById);

router.post(
  "/",
  authenticate,
  validateData(schemas.addSchema),
  controller.addContact
);

router.delete("/:contactId", authenticate, isValidId, controller.delContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateData(schemas.addSchema),
  controller.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateStatus(schemas.updateFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
