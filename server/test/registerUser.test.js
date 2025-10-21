import prisma from "../src/config/db.js";
import { registerUser } from "../src/modules/user/user.service.js";

describe("Register User Service", () => {
  const testUser = {
    firstname: "Test",
    lastname: "User",
    email: "testuser@example.com",
    password: "123456",
    phone: "01700000000",
    address: "Dhaka",
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  it("should register a new user successfully", async () => {
    const user = await registerUser(testUser);
    expect(user).toHaveProperty("id");
    expect(user.firstname).toBe(testUser.firstname);
    expect(user).toHaveProperty("token");
    expect(user.password).toBeUndefined();
  });

  it("should throw error if user already exists", async () => {
    await expect(registerUser(testUser)).rejects.toThrow("User already exists");
  });
});
