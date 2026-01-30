const authz = (...allowedroles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedroles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Not Allowed",
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
};
module.exports = { authz };
