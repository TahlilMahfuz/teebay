import prisma from "../../config/db.js";

export const createUser = (data) => prisma.user.create({ data });
export const findUserByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });
