const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth");

const { validateData, authenticate, upload } = require("../middlewares");

const schemas = require("../schemas/users");

router.post("/register", validateData(schemas.authSchema), controller.register);

router.post("/login", validateData(schemas.authSchema), controller.login);

router.get("/current", authenticate, controller.getCurrent);

router.post("/logout", authenticate, controller.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controller.updateAvatar
);

router.post("/avatars", upload.single("avatar"), controller.giveStaticImg);

module.exports = router;
