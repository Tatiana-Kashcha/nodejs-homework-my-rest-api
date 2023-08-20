const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");

router.get("/", controller.getAllContacts);

router.get("/:contactId", controller.getContact);

router.post("/", controller.addNewContact);

router.delete("/:contactId", controller.delContact);

router.put("/:contactId", controller.editContact);

module.exports = router;
