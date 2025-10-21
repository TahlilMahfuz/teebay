import prisma from "../src/config/db.js";
import { registerUser, loginUser } from "../src/modules/user/user.service.js";
import { addProduct, getProductById } from "../src/modules/product/product.service.js";
import { removeProduct } from "../src/modules/product/product.service.js";

describe("Delete Product Service", () => {
  let testUser;
  let token;
  let product;

  beforeAll(async () => {
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({ where: { email: "deleteuser@test.com" } });

    testUser = await registerUser({
      firstname: "Delete",
      lastname: "User",
      email: "deleteuser@test.com",
      password: "123456",
      phone: "01700000001",
      address: "Dhaka",
    });

    const loginResp = await loginUser(testUser.email, "123456");
    token = loginResp.token;

    const allCategories = await prisma.category.findMany();
    const categoryNames = allCategories.map(c => c.name);

    product = await addProduct({
        title: "Test Product",
        description: "This is a test product",
        price: 100,
        rentPerDay: 10,
        ownerId: testUser.id,
        categories: categoryNames.slice(0, 2), 
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should delete a product successfully", async () => {
    const deleted = await removeProduct(product.id, testUser.id);
    expect(deleted).toBeDefined();
    expect(deleted.id).toBe(product.id);

    const check = await getProductById(product.id);
    expect(check).toBeNull();
  });

  it("should throw error if product does not exist", async () => {
    await expect(removeProduct(9999, testUser.id)).rejects.toThrow("Product not found");
  });

  it("should throw error if user is not the owner", async () => {
    const otherUser = await registerUser({
      firstname: "Other",
      lastname: "User",
      email: "otheruser535@test.com",
      password: "123456",
    });

    const allCategories = await prisma.category.findMany();
    const categoryNames = allCategories.map(c => c.name);

    const newProduct = await addProduct({
      title: "Another Product",
      description: "Not owned by other user",
      price: 50,
      rentPerDay: 5,
      ownerId: testUser.id,
      categories: categoryNames.slice(0, 2),
    });

    await expect(removeProduct(newProduct.id, otherUser.id)).rejects.toThrow(
      "Unauthorized: You are not the owner of this product"
    );
  });
});
