import { getUserTransactions } from "../repository/transactProduct.repository.js";

export const getUserActivity = async (userId) => {
  if (!userId) throw new Error("User ID required");
  const transactions = await getUserTransactions(userId);
  return transactions;
};