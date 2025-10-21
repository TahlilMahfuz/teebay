import { createUser, findUserByEmail } from "./user.repository.js";
import { hashPassword, comparePassword, signToken } from "../../utils/hash.js";

export const registerUser = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(userData.password);
  const newUser = await createUser({ ...userData, password: hashedPassword });

  // Optionally, generate a token upon registration
  const token = signToken({ id: newUser.id, email: newUser.email });

  return { ...newUser, password: undefined, token };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  // Generate JWT token
  const token = signToken({ id: user.id, email: user.email });

  return { ...user, password: undefined, token };
};
