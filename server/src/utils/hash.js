import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Hash password
export const hashPassword = async (password) => bcrypt.hash(password, 10);

// Compare password
export const comparePassword = async (password, hash) => bcrypt.compare(password, hash);

// Sign JWT
export const signToken = (payload, expiresIn = "7d") =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

// Verify JWT
export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
