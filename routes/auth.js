const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth");

const { validateData } = require("../middlewares");

const schemas = require("../schemas/users");

router.post("/register", validateData(schemas.authSchema), controller.register);

router.post("/login", validateData(schemas.authSchema), controller.login);

// router.get("/current", authenticate, ctrl.getCurrent);

// router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
