import prisma from "../src/config/db.js";
import { registerUser, loginUser } from "../src/modules/user/user.service.js";
import { addProduct } from "../src/modules/product/product.service.js";

describe("Create Product Service", () => {
  const testUser = {
    firstname: "Test",
    lastname: "User",
    email: "testuser@example.com",
    password: "123456",
    phone: "01700000000",
    address: "Dhaka",
  };

  let authUser = null;

  beforeAll(async () => {
    // Clean database in correct dependency order
    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany({ where: { email: testUser.email } });

    // Register and log in the test user
    await registerUser(testUser);
    authUser = await loginUser(testUser.email, testUser.password);

    // Seed required categories (matching your schema)
    const categories = ["ELECTRONICS", "FURNITURE"];
    for (const name of categories) {
      await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }
  });

  afterAll(async () => {
    // Clean up in correct order again
    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  it("should create a product successfully", async () => {
    const productData = {
      title: "Gaming Laptop",
      description: "High-performance laptop for gaming and work",
      price: 1500,
      rentPerDay: 75,
      ownerId: authUser.id,
      categories: ["ELECTRONICS", "FURNITURE"],
    };

    const product = await addProduct(productData);

    // ✅ Assertions
    expect(product).toHaveProperty("id");
    expect(product.title).toBe(productData.title);
    expect(product.ownerId).toBe(authUser.id);
    expect(product.categories.length).toBeGreaterThan(0);
  });

  it("should throw error for invalid category", async () => {
    const invalidData = {
      title: "Old Table",
      description: "Antique wooden table",
      price: 200,
      rentPerDay: 10,
      ownerId: authUser.id,
      categories: ["INVALID_CATEGORY"],
    };

    await expect(addProduct(invalidData)).rejects.toThrow("Invalid categories");
  });

  it("should throw error if no category is provided", async () => {
    const invalidData = {
      title: "Random Item",
      description: "No category",
      price: 100,
      rentPerDay: 5,
      ownerId: authUser.id,
      categories: [],
    };

    await expect(addProduct(invalidData)).rejects.toThrow("Product must have at least one category");
  });
});
