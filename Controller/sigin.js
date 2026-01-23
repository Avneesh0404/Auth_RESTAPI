const User = require("../model/user");
const sigin = async (req, res) => {
  try {
    const { email, role, password } = req.body;
    await User.create({
      email: email,
      role: role,
      password: password,
    });
    return res.status(201).json({ message: "User created Successful" });
  } catch (error) {
    return res.status(500).json({
      message: "Error Creating user",
      error: error.message,
    });
  }
};
module.exports = { sigin};
