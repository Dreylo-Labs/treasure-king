const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { gEnv } = require("../utils/env");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      msg: "Access Denied/Not Authorized. Please login",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secretKey = gEnv("JWT_SECRET");

    const decoded = await promisify(jwt.verify)(token, secretKey);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).send({
        msg: "User not found. Please sign up.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(400).send({
      msg: "Invalid or expired token. Please login again",
    });
  }
};

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      msg: "Access Denied/Not Authorized. Please login",
    });
  }

  try {
    await promisify(jwt.verify)(token, gEnv("ADMIN_JWT_SECRET"));
    next();
  } catch (error) {
    return res.status(400).send({
      msg: "Invalid token. Please login",
    });
  }
};

module.exports = { auth, adminAuth };