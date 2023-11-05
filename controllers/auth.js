const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const crypto = require("node:crypto");

const User = require("../models/user");
const { HttpError, sendEmail } = require("../helpers");

const { SECRET_KEY, PORT } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = crypto.randomUUID();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    await sendEmail({
      to: newUser.email,
      subject: "To verify your email",
      html: `
      <p>To confirm your registration, please click on link below</p>
      <p>
        <a target="_blank" href="http://localhost:${PORT}/users/verify/${verificationToken}">Click verify email</a>
      </p>
      `,
      text: `
        To confirm your registration, please click on link below\n
        http://localhost:${PORT}/users/verify/${verificationToken}
      `,
    });

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    if (user.verify !== true) {
      throw HttpError(401, "Please verify your email");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        token: user.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);
    await image.writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const giveStaticImg = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);

  await fs.rename(tempUpload, resultUpload);
  const cover = path.join("public", "avatars", originalname);
  const coverImg = { cover };

  res.status(201).json(coverImg);
};

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (user === null) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    await sendEmail({
      to: user.email,
      subject: "To verify your email",
      html: `
      <p>To confirm your registration, please click on link below</p>
      <p>
        <a target="_blank" href="http://localhost:${PORT}/users/verify/${user.verificationToken}">Click verify email</a>
      </p>
      `,
      text: `
        To confirm your registration, please click on link below\n
        http://localhost:${PORT}/users/verify/${user.verificationToken}
      `,
    });

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  giveStaticImg,
  verify,
  resendVerifyEmail,
};
