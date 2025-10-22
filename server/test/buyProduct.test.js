import prisma from "../src/config/db.js";
import { registerUser } from "../src/modules/user/user.service.js";
import { addProduct } from "../src/modules/product/service/product.service.js";
import { purchaseProduct } from "../src/modules/product/service/buyProduct.service.js";

describe("Buy Product Service", () => {
  let ownerUser;
  let buyerUser;
  let product;

  beforeAll(async () => {
    // Clean up database
    await prisma.rental.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({
      where: { email: { in: ["owner@test.com", "buyer@test.com"] } },
    });

    // Create owner
    ownerUser = await registerUser({
      firstname: "Owner",
      lastname: "User",
      email: "owner@test.com",
      password: "123456",
    });

    // Create buyer
    buyerUser = await registerUser({
      firstname: "Buyer",
      lastname: "User",
      email: "buyer@test.com",
      password: "123456",
    });

    // Create a product
    const allCategories = await prisma.category.findMany();
    const categoryNames = allCategories.map((c) => c.name);

    product = await addProduct({
      title: "Test Product",
      description: "Product for buying test",
      price: 1000,
      rentPerDay: 50,
      ownerId: ownerUser.id,
      categories: categoryNames.slice(0, 2),
    });
  });

  afterAll(async () => {
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({
      where: { email: { in: ["owner@test.com", "buyer@test.com"] } },
    });
    await prisma.$disconnect();
  });

  it("should buy a product successfully", async () => {
    const purchased = await purchaseProduct(product.id, buyerUser.id);

    expect(purchased).toBeDefined();
    expect(purchased.id).toBe(product.id);
    expect(purchased.isSold).toBe(true);
    expect(purchased.buyerId).toBe(buyerUser.id);
    expect(purchased.ownerId).toBe(ownerUser.id);

    // Categories should be mapped
    expect(purchased.categories.length).toBeGreaterThan(0);
    expect(purchased.categories[0]).toHaveProperty("id");
    expect(purchased.categories[0]).toHaveProperty("name");
  });

  it("should throw error if product does not exist", async () => {
    await expect(purchaseProduct(9999, buyerUser.id)).rejects.toThrow(
      "Product not found"
    );
  });

  it("should throw error if product is already sold", async () => {
    await expect(purchaseProduct(product.id, buyerUser.id)).rejects.toThrow(
      "Product is already sold"
    );
  });

  it("should throw error if user tries to buy their own product", async () => {
    const anotherProduct = await addProduct({
      title: "Owner Product",
      description: "Owned by owner",
      price: 500,
      rentPerDay: 25,
      ownerId: ownerUser.id,
      categories: product.categories.map((c) => c.name),
    });

    await expect(purchaseProduct(anotherProduct.id, ownerUser.id)).rejects.toThrow(
      "You cannot buy your own product"
    );
  });
});
