const User = require("../model/user");
const RefreshToken = require("../model/refresh");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  createAccessToken,
  createRefreshToken,
} = require("../Services/accesstoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Email not found",
      });
    }
    if (!user.is_active) {
      return res.status(403).json({
        message: "User account is blocked",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }

    const accesstoken = createAccessToken(user);
    const refreshtoken = await createRefreshToken(user._id);
    res
      .cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({ accesstoken, role: user.role });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshtoken;
  if (!refreshToken) {
    return res.status(200).json({
      message: "Already Logged out",
    });
  }
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  try {
    await RefreshToken.findOneAndUpdate(
      { token_hash: refreshTokenHash },
      { is_revoked: true },
    );

    return res
      .clearCookie("refreshtoken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "Cleared Cookie Logged out Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { login, logout };
