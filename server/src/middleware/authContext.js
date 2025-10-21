import jwt, { decode } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; 

export const isAuthenticated = async ({ req }) => {
  if (!req) return { userId: null, user: null };
  const authHeader = req.headers?.authorization || "";
  let userId = null;
  let user = null;
  if (authHeader) {
    const token = authHeader;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      user = decoded;
    } catch (err) {
      console.error("Invalid or expired token:", err.message);
    }
  }

  return { userId, user };
};
