const jwt = require("jsonwebtoken");
const { supabaseAdmin } = require("../config/database");

const JWT_SECRET = process.env.JWT_SECRET || "empire_lane_limo_jwt_secret";

// Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Middleware to authenticate requests
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error) {
      console.error("Supabase auth.getUser error:", error);
      return res.status(403).json({ error: error.message });
    }

    if (!data || !data.user) {
      return res.status(403).json({ error: "Invalid token or user not found" });
    }

    req.user = data.user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken
};

