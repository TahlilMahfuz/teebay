import { createUser, findUserByEmail } from "./user.repository.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";

export const registerUser = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(userData.password);
  return createUser({ ...userData, password: hashedPassword });
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return user;
};
