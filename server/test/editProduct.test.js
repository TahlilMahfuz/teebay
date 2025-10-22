import prisma from "../src/config/db.js";
import { registerUser } from "../src/modules/user/user.service.js";
import { addProduct } from "../src/modules/product/service/product.service.js";
import { editProductRepo } from "../src/modules/product/repository/editProduct.respository.js"

describe("Edit Product Repository", () => {
  let ownerUser, anotherUser;
  let product;

  beforeAll(async () => {
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});

    await prisma.category.createMany({
      data: [
        { name: "ELECTRONICS" },
        { name: "FURNITURE" },
        { name: "OUTDOOR" },
      ],
    });


    ownerUser = await registerUser({ firstname: "John", lastname: "Doe", email: "owner@test.com", password: "123456" });
    anotherUser = await registerUser({ firstname: "Jane", lastname: "Smith", email: "another@test.com", password: "123456" });

    product = await addProduct({
      title: "Gaming Laptop",
      description: "High-performance laptop",
      price: 1500,
      rentPerDay: 75,
      ownerId: ownerUser.id,
      categories: ["ELECTRONICS"],
    });
  });

  afterAll(async () => {
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });

  it("should successfully edit a product", async () => {
    const updatedData = {
      title: "Gaming Laptop Pro 2025",
      description: "Upgraded high-performance gaming laptop with RTX 4080 GPU.",
      price: 1800,
      rentPerDay: 90,
      categories: ["ELECTRONICS"],
    };

    const updatedProduct = await editProductRepo(product.id, ownerUser.id, updatedData);

    expect(updatedProduct.id).toBe(product.id);
    expect(updatedProduct.title).toBe(updatedData.title);
    expect(updatedProduct.description).toBe(updatedData.description);
    expect(updatedProduct.price).toBe(updatedData.price);
    expect(updatedProduct.rentPerDay).toBe(updatedData.rentPerDay);
    expect(updatedProduct.categories.length).toBe(1);
    expect(updatedProduct.categories[0].name).toBe("ELECTRONICS");
  });

  it("should not allow editing by a non-owner", async () => {
    const updatedData = { title: "Hacked Title" };

    await expect(editProductRepo(product.id, anotherUser.id, updatedData))
      .rejects
      .toThrow("You can only edit your own products");
  });

  it("should not allow editing a sold product", async () => {
    // Mark product as sold
    await prisma.product.update({ where: { id: product.id }, data: { isSold: true } });

    const updatedData = { title: "Another Title" };

    await expect(editProductRepo(product.id, ownerUser.id, updatedData))
      .rejects
      .toThrow("Cannot edit a sold product");

    // Reset isSold for future tests
    await prisma.product.update({ where: { id: product.id }, data: { isSold: false } });
  });

  it("should update product categories correctly", async () => {
    const updatedData = {
      categories: ["FURNITURE", "OUTDOOR"],
    };

    const updatedProduct = await editProductRepo(product.id, ownerUser.id, updatedData);

    expect(updatedProduct.categories.length).toBe(2);
    const categoryNames = updatedProduct.categories.map((c) => c.name);
    expect(categoryNames).toEqual(expect.arrayContaining(["FURNITURE", "OUTDOOR"]));
  });
});
