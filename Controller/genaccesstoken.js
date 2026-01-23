const RefreshToken = require("../model/refresh");
const crypto = require("crypto");
const User = require("../model/user");
const { createAccessToken } = require("../Services/accesstoken");

const gennewaccesstoken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const storedToken = await RefreshToken.findOne({
      token_hash: refreshTokenHash,
      is_revoked: false,
    });

    if (!storedToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    if (storedToken.expires_at < new Date()) {
      return res.status(401).json({
        message: "Refresh token expired. Please login again.",
      });
    }

    const user = await User.findById(storedToken.user_id);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const newAccessToken = createAccessToken(user);

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { gennewaccesstoken };
