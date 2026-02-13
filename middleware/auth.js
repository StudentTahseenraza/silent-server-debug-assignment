const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET || "default-secret-key";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};