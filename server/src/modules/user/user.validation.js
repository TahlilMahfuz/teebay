export const validateRegisterInput = (input) => {
  const { name, email, password } = input;

  if (!name || !email || !password) return "All fields are required.";
  if (!email.includes("@")) return "Invalid email address.";
  if (password.length < 4) return "Password must be at least 4 characters long.";

  return null; // no error
};
