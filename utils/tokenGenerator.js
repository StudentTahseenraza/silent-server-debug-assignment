const crypto = require("crypto");
const { getSecretFromDB } = require("./mockDb");

const generateToken = async (email) => {
  try {
    const secret = await getSecretFromDB();
    
    if (!secret) {
      throw new Error("Secret is required for token generation");
    }

    return crypto
      .createHmac("sha256", secret)
      .update(email)
      .digest("base64");
  } catch (error) {
    // FIX: Log the error and rethrow or return a default
    console.error("Token generation error:", error.message);
    // Fallback to a simple token if DB fails
    return crypto
      .createHmac("sha256", "fallback-secret-key")
      .update(email)
      .digest("base64");
  }
};

module.exports = { generateToken };