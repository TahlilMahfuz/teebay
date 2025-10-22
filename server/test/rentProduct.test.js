import prisma from "../src/config/db.js";
import { registerUser, loginUser } from "../src/modules/user/user.service.js";
import { addProduct } from "../src/modules/product/service/product.service.js";
import { rentAProduct } from "../src/modules/product/service/rentProduct.sevice.js";

describe("Rent Product Service", () => {
  let ownerUser;
  let renterUser;
  let product;

  beforeAll(async () => {
    // Clean up
    await prisma.rental.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({ where: { email: { in: ["owner@test.com", "renter@test.com"] } } });

    // Owner
    ownerUser = await registerUser({
      firstname: "Owner",
      lastname: "User",
      email: "owner@test.com",
      password: "123456",
    });

    // Renter
    renterUser = await registerUser({
      firstname: "Renter",
      lastname: "User",
      email: "renter@test.com",
      password: "123456",
    });

    // Create product with ownerUser
    const allCategories = await prisma.category.findMany();
    const categoryNames = allCategories.map(c => c.name);

    product = await addProduct({
      title: "Test Rental Product",
      description: "Product to test rent functionality",
      price: 200,
      rentPerDay: 20,
      ownerId: ownerUser.id,
      categories: categoryNames.slice(0, 2),
    });
  });

  afterAll(async () => {
    await prisma.rental.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({ where: { email: { in: ["owner@test.com", "renter@test.com"] } } });
    await prisma.$disconnect();
  });

  it("should rent a product successfully", async () => {
    const startDate = new Date("2025-10-25T00:00:00.000Z");
    const endDate = new Date("2025-10-30T00:00:00.000Z");

    const rental = await rentAProduct(product.id, renterUser.id, startDate, endDate);

    expect(rental).toBeDefined();
    expect(rental.productId).toBe(product.id);
    expect(rental.renterId).toBe(renterUser.id);
    expect(new Date(rental.startDate).toISOString()).toBe(startDate.toISOString());
    expect(new Date(rental.endDate).toISOString()).toBe(endDate.toISOString());

    // Verify in DB
    const rentalInDB = await prisma.rental.findUnique({ where: { id: rental.id } });
    expect(rentalInDB).toBeDefined();
  });

  it("should throw error if product does not exist", async () => {
    const startDate = new Date("2025-10-25T00:00:00.000Z");
    const endDate = new Date("2025-10-30T00:00:00.000Z");

    await expect(
      rentAProduct(9999, renterUser.id, startDate, endDate)
    ).rejects.toThrow("Product not found");
  });

  it("should throw error if rental dates overlap", async () => {
    // Overlap with first rental
    const startDate = new Date("2025-10-28T00:00:00.000Z");
    const endDate = new Date("2025-11-02T00:00:00.000Z");

    await expect(
      rentAProduct(product.id, renterUser.id, startDate, endDate)
    ).rejects.toThrow("Product is already rented during this period");
  });

  it("should throw error if renter tries to rent own product", async () => {
    const startDate = new Date("2025-11-05T00:00:00.000Z");
    const endDate = new Date("2025-11-10T00:00:00.000Z");

    await expect(
      rentAProduct(product.id, ownerUser.id, startDate, endDate)
    ).rejects.toThrow("You cannot rent your own product");
  });
});
