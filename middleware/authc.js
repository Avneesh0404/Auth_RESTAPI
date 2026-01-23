const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const authmiddleware = (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader.split("Bearer ")[1];
  try {
    const payload = jwt.verify(token, secret);
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token Bahijan",
      error: error.message,
    });
  }
};
module.exports = { authmiddleware };
