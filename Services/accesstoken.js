const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../model/refresh");
const SECRET = process.env.TOKEN_SECRET;

const createAccessToken = (user) => {
  return (accesstoken = jwt.sign(
    { userId: user._id, role: user.role },
    SECRET,
    { expiresIn: "15m" },
  ));
};

const createRefreshToken = async (userId) => {
  const refreshToken = crypto.randomBytes(40).toString("hex");

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await RefreshToken.create({
    user_id: userId,
    token_hash: refreshTokenHash,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return refreshToken;
};

module.exports = { createAccessToken, createRefreshToken };
