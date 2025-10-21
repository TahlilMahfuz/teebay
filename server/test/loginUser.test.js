import prisma from "../src/config/db.js";
import { registerUser, loginUser } from "../src/modules/user/user.service.js";

describe("Login User Service", () => {
  const testUser = {
    firstname: "Test",
    lastname: "User",
    email: "testuser@example.com",
    password: "123456",
    phone: "01700000000",
    address: "Dhaka",
  };

  beforeAll(async () => {
    // Ensure user exists for login
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await registerUser(testUser);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  it("should login user successfully", async () => {
    const user = await loginUser(testUser.email, testUser.password);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("token");
    expect(user.password).toBeUndefined();
  });

  it("should throw error if email not found", async () => {
    await expect(loginUser("notfound@test.com", "123456")).rejects.toThrow("User not found");
  });

  it("should throw error if password is incorrect", async () => {
    await expect(loginUser(testUser.email, "wrongpassword")).rejects.toThrow("Invalid credentials");
  });
});
