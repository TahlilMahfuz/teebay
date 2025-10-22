import prisma from "../src/config/db.js";
import { addProduct, getAllCategories, getAllProducts, getProductById } from "../src/modules/product/service/product.service.js";
import { loginUser, registerUser } from "../src/modules/user/user.service.js";

describe("Create Product Service & Coverage", () => {
  const testUser = {
    firstname: "Test",
    lastname: "User",
    email: "testuser@example.com",
    password: "123456",
    phone: "01700000000",
    address: "Dhaka",
  };

  let authUser = null;
  let createdProduct = null;

  beforeAll(async () => {
    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany({ where: { email: testUser.email } });

    await registerUser(testUser);
    authUser = await loginUser(testUser.email, testUser.password);
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
    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
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

    createdProduct = await addProduct(productData);

    expect(createdProduct).toHaveProperty("id");
    expect(createdProduct.title).toBe(productData.title);
    expect(createdProduct.ownerId).toBe(authUser.id);
    expect(createdProduct.categories.length).toBe(2);
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

  it("should get all products", async () => {
    const products = await getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("should get product by id", async () => {
    const product = await getProductById(createdProduct.id);
    expect(product).toBeDefined();
    expect(product.id).toBe(createdProduct.id);
    expect(product.categories.length).toBeGreaterThan(0);
  });

  it("should get all categories", async () => {
    const categories = await getAllCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });
});
