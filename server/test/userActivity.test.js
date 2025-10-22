import prisma from "../src/config/db.js";
import { registerUser } from "../src/modules/user/user.service.js";
import { addProduct } from "../src/modules/product/service/product.service.js";
import { rentProduct } from "../src/modules/product/repository/rentProduct.repository.js";
import { buyProduct } from "../src/modules/product/repository/buyProduct.repository.js";
import { getUserActivity } from "../src/modules/product/service/transactProduct.service.js";

describe("User Activity Service", () => {
  let ownerUser, buyerUser, renterUser, anotherUser;
  let product1, product2, product3;

  beforeAll(async () => {
    // Cleanup
    await prisma.rental.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    // Create multiple users
    ownerUser = await registerUser({
      firstname: "Owner",
      lastname: "User",
      email: "owner@test.com",
      password: "123456",
    });

    buyerUser = await registerUser({
      firstname: "Buyer",
      lastname: "User",
      email: "buyer@test.com",
      password: "123456",
    });

    renterUser = await registerUser({
      firstname: "Renter",
      lastname: "User",
      email: "renter@test.com",
      password: "123456",
    });

    anotherUser = await registerUser({
      firstname: "Another",
      lastname: "User",
      email: "another@test.com",
      password: "123456",
    });

    const allCategories = await prisma.category.findMany();
    const categoryNames = allCategories.map((c) => c.name);

    // Add products
    product1 = await addProduct({
      title: "Product 1",
      description: "First Product",
      price: 100,
      rentPerDay: 10,
      ownerId: ownerUser.id,
      categories: categoryNames.slice(0, 1),
    });

    product2 = await addProduct({
      title: "Product 2",
      description: "Second Product",
      price: 200,
      rentPerDay: 20,
      ownerId: ownerUser.id,
      categories: categoryNames.slice(1, 2),
    });

    product3 = await addProduct({
      title: "Product 3",
      description: "Third Product",
      price: 300,
      rentPerDay: 30,
      ownerId: anotherUser.id,
      categories: categoryNames.slice(0, 2),
    });

    // Buyer buys product1 from owner
    await buyProduct(product1.id, buyerUser.id);

    // Renter rents product2 from owner
    await rentProduct(
      product2.id,
      renterUser.id,
      new Date("2025-10-25"),
      new Date("2025-10-30")
    );

    // Renter rents product3 from another user
    await rentProduct(
      product3.id,
      renterUser.id,
      new Date("2025-11-01"),
      new Date("2025-11-05")
    );
  });

  afterAll(async () => {
    await prisma.rental.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  it("should correctly return transactions for buyerUser", async () => {
    const activity = await getUserActivity(buyerUser.id);
    // console.log("Bought Products:", activity.boughtProducts);

    expect(activity.boughtProducts.length).toBe(1);
    expect(activity.boughtProducts[0].id).toBe(product1.id);

    expect(activity.soldProducts.length).toBe(0);
    expect(activity.rentedProducts.length).toBe(0);
    expect(activity.lentProducts.length).toBe(0);
  });

  it("should correctly return transactions for renterUser", async () => {
    const activity = await getUserActivity(renterUser.id);
    // console.log("Rented Products:", activity.rentedProducts);

    expect(activity.rentedProducts.length).toBe(2);
    expect(activity.rentedProducts.map((r) => r.productId)).toEqual(
      expect.arrayContaining([product2.id, product3.id])
    );

    expect(activity.boughtProducts.length).toBe(0);
    expect(activity.soldProducts.length).toBe(0);
    expect(activity.lentProducts.length).toBe(0);
  });

  it("should correctly return transactions for ownerUser", async () => {
    const activity = await getUserActivity(ownerUser.id);
    // console.log("Sold Products:", activity.soldProducts);

    // product1 sold to buyerUser
    expect(activity.soldProducts.length).toBe(1);
    expect(activity.soldProducts[0].id).toBe(product1.id);

    // product2 lent to renterUser
    expect(activity.lentProducts.length).toBe(1);
    expect(activity.lentProducts[0].productId).toBe(product2.id);

    expect(activity.boughtProducts.length).toBe(0);
    expect(activity.rentedProducts.length).toBe(0);
  });

  it("should correctly return transactions for anotherUser", async () => {
    const activity = await getUserActivity(anotherUser.id);
    // console.log("Lent Products:", activity.lentProducts);

    // product3 lent to renterUser
    expect(activity.lentProducts.length).toBe(1);
    expect(activity.lentProducts[0].productId).toBe(product3.id);

    expect(activity.soldProducts.length).toBe(0);
    expect(activity.boughtProducts.length).toBe(0);
    expect(activity.rentedProducts.length).toBe(0);
  });
});
