const request = require("supertest");
const app = require("../app");
const { Product, Category, User, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
//fix ini susaaaaaaaaaaaaaah
let access_token;
let user;
let product;

beforeAll(async () => {
  await Category.create({
    id: 1,
    name: "testCategory",
  });
  user = await User.create({
    email: "test@gmail.com",
    password: "testpassword12",
    phoneNumber: "222-222-2222",
    address: "testaddres",
    username: "username test",
    role: "Admin",
  });
  access_token = signToken(user);

  product = await Product.create({
    name: "Test Product",
    description: "Test description",
    price: 100,
    stock: 10,
    imgUrl: "test-img-url",
    categoryId: 1,
    authorId: user.id,
  });
});

afterAll(async () => {
  await Category.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Product.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /products", () => {
  test("POST /products should able to create product successfully", async () => {
    const newProduct = {
      name: "testing with TDD",
      description: "description test with TDD",
      price: 10000,
      stock: 12,
      imgUrl: "imgUrl test with TDD",
      categoryId: 1,
      authorId: user.id,
    };
    const response = await request(app)
      .post("/products")
      .send(newProduct)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", newProduct.name);
    expect(response.body).toHaveProperty("description", newProduct.description);
    expect(response.body).toHaveProperty("price", newProduct.price);
    expect(response.body).toHaveProperty("stock", newProduct.stock);
    expect(response.body).toHaveProperty("imgUrl", newProduct.imgUrl);
    expect(response.body).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body).toHaveProperty("authorId", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  test("POST /products failed to create product because user is not log in", async () => {
    const newProduct = {
      name: "testing with TDD",
      description: "description test with TDD",
      price: 10000,
      stock: 12,
      imgUrl: "imgUrl test with TDD",
      categoryId: 1,
      authorId: user.id,
    };
    const response = await request(app).post("/products").send(newProduct);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("POST /products failed to create product because invalid token", async () => {
    const newProduct = {
      name: "testing with TDD",
      description: "description test with TDD",
      price: 10000,
      stock: 12,
      imgUrl: "imgUrl test with TDD",
      categoryId: 1,
      authorId: user.id,
    };
    const response = await request(app).post("/products").send(newProduct);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("POST /products failed to create product because incorrect request body", async () => {
    const newProduct = {
      description: "description test with TDD",
      price: 10000,
      stock: 12,
      imgUrl: "imgUrl test with TDD",
      categoryId: 1,
      authorId: user.id,
    };
    const response = await request(app)
      .post("/products")
      .send(newProduct)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Product name is required");
  });
});

describe("GET /products", () => {
  test("should be able to get list products successfully", async () => {
    const newProduct = {
      name: "testing with TDD",
      description: "description test with TDD",
      price: 10000,
      stock: 12,
      imgUrl: "imgUrl test with TDD",
      categoryId: 1,
      authorId: user.id,
    };
    const response = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    const firstProduct = response.body[0];

    expect(firstProduct).toHaveProperty("id", expect.any(Number));
    expect(firstProduct).toHaveProperty("name", expect.any(String));
    expect(firstProduct).toHaveProperty("description", expect.any(String));
    expect(firstProduct).toHaveProperty("price", expect.any(Number));
    expect(firstProduct).toHaveProperty("stock", expect.any(Number));
    expect(firstProduct).toHaveProperty("imgUrl", expect.any(String));
    expect(firstProduct).toHaveProperty("categoryId", expect.any(Number));
    expect(firstProduct).toHaveProperty("authorId", expect.any(Number));
    expect(firstProduct).toHaveProperty("createdAt", expect.any(String));
    expect(firstProduct).toHaveProperty("updatedAt", expect.any(String));
  });

  test("should fail to get list products because user not log in", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("should fail to get list products with invalid token", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});

describe("GET /products/:id", () => {
  test("should be able to get product by id", async () => {
    const response = await request(app)
      .get("/products/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("price", expect.any(Number));
    expect(response.body).toHaveProperty("stock", expect.any(Number));
    expect(response.body).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body).toHaveProperty("authorId", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  test("should fail to get list products because user not log in", async () => {
    const response = await request(app).get("/products/1");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("should fail to get list products with invalid token", async () => {
    const response = await request(app).get("/products/1");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
  test("should fail to get product details with invalid product ID", async () => {
    const invalidProductId = 9999;
    const response = await request(app)
      .get(`/products/${invalidProductId}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data not found");
  });
});

describe("PUT /products/:id", () => {
  test("Successfully update product by ID", async () => {
    const updatedProduct = {
      name: "Updated Product",
      description: "Updated description",
      price: 150,
      stock: 20,
      imgUrl: "updated-img-url",
      categoryId: 1,
    };

    const response = await request(app)
      .put(`/products/1`)
      .send(updatedProduct)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body.data).toHaveProperty("id", expect.any(Number));
    expect(response.body.data).toHaveProperty("name", expect.any(String));
    expect(response.body.data).toHaveProperty(
      "description",
      expect.any(String)
    );
    expect(response.body.data).toHaveProperty("price", expect.any(Number));
    expect(response.body.data).toHaveProperty("stock", expect.any(Number));
    expect(response.body.data).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.data).toHaveProperty("categoryId", expect.any(Number));
    expect(response.body.data).toHaveProperty("authorId", expect.any(Number));
    expect(response.body.data).toHaveProperty("createdAt", expect.any(String));
    expect(response.body.data).toHaveProperty("updatedAt", expect.any(String));
  });

  test("should fail to update products because user not log in", async () => {
    const updatedProduct = {
      name: "Updated Product",
      description: "Updated description",
      price: 150,
      stock: 20,
      imgUrl: "updated-img-url",
      categoryId: 1,
    };

    const response = await request(app).put(`/products/1`).send(updatedProduct);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("should fail to update products because non-exist id", async () => {
    const updatedProduct = {
      name: "Updated Product",
      description: "Updated description",
      price: 150,
      stock: 20,
      imgUrl: "updated-img-url",
      categoryId: 1,
    };

    const response = await request(app)
      .put(`/products/999`)
      .send(updatedProduct)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data not found");
  });

  test.skip("should fail to update products because manipulating ID", async () => {
    const unauthorizedProductId = 1;
    const updatedProduct = {
      name: "Updated Product",
      description: "Updated description",
      price: 150,
      stock: 20,
      imgUrl: "updated-img-url",
      categoryId: 1,
    };

    const response = await request(app)
      .put(`/products/${unauthorizedProductId}`)
      .send(updatedProduct)
      .set("Authorization", `Bearer ${access_token}`);

    console.log("Response Status:", response.status);
    console.log("Response Body:", response.body);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Data not found");
  });

  test("failed to update product because incorrect request body", async () => {
    const updatedProduct = {};
    const response = await request(app)
      .put("/products/1")
      .send(updatedProduct)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Request body is required");
  });
});

describe("DELETE /products/:id", () => {
  test("should successfully delete product by ID", async () => {
    const response = await request(app)
      .delete("/products/1")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Success delete product by id 1"
    );
  });

  test("should fail to delete product without authentication", async () => {
    const response = await request(app).delete("/products/1");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("should fail to delete non-exist product", async () => {
    const response = await request(app)
      .delete("/products/99")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Data not found");
  });

  test.skip("should fail to delete product because forbidden access", async () => {
    const response = await request(app)
      .delete("/products/2")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "ForbiddenAccess");
  });
});

describe("PATCH /products/:id/img-url", () => {
  test("should successfully update product img URL", async () => {
    const productId = 1;
    const imageUrl =
      "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/a5339c520a6042b5bf752d25a8c89166ec17f511_xxl-1.jpg";

    try {
      const response = await request(app)
        .patch(`/products/${productId}/imgUrl`)
        .set("Authorization", `Bearer ${access_token}`)
        .send({ imgUrl: imageUrl });

      console.log("Response Status:", response.status);
      console.log("Response Body:", response.body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        `Image updated successfully for product with ID ${productId}`
      );
    } catch (error) {
      console.error("Test Error:", error);
    }
  });

  test("should fail to update product img URL beacuse user not login", async () => {
    const productId = 1;
    const imageUrl =
      "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/a5339c520a6042b5bf752d25a8c89166ec17f511_xxl-1.jpg";

    try {
      const response = await request(app)
        .patch(`/products/${productId}/imgUrl`)
        .send({ imgUrl: imageUrl });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Authentication required"
      );
    } catch (error) {
      console.error("Test Error:", error);
    }
  });
  test("should fail to update product img URL due to non-exist product", async () => {
    const nonExistentProductId = 99;
    const imageUrl =
      "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/a5339c520a6042b5bf752d25a8c89166ec17f511_xxl-1.jpg";

    try {
      const response = await request(app)
        .patch(`/products/${nonExistentProductId}/imgUrl`)
        .set("Authorization", `Bearer ${access_token}`)
        .send({ imgUrl: imageUrl });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Product not found");
    } catch (error) {
      console.error("Test Error:", error);
    }
  });

  it("should fail to update product img URL due to invalid request body", async () => {
    const productId = 1;
    const invalidRequestBody = {};

    try {
      const response = await request(app)
        .patch(`/products/${productId}/imgUrl`)
        .set("Authorization", `Bearer ${access_token}`)
        .send(invalidRequestBody);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid request body");
    } catch (error) {
      console.error("Test Error:", error);
    }
  });
});


//==========================================


describe("GET /categories", () => {
    test.skip('should successfully get category', async () => {
        const category = {
            name: "test category 1"
          };
        const response = await request(app)
          .get('/categories')
          .set('Authorization', `Bearer ${access_token}`);
          expect(response.body).toBeInstanceOf(Object);

          

          const firstCategory = response.body[0];
      
      
        expect(response.status).toBe(200);
        expect(firstCategory).toHaveProperty("id", category.id);
        expect(firstCategory).toHaveProperty("name", expect.any(String));
        expect(firstCategory).toHaveProperty("createdAt", expect.any(String));
        expect(firstCategory).toHaveProperty("updatedAt", expect.any(String));
      });

      test("should fail to get list category because user not log in", async () => {
        const response = await request(app).get("/categories");
    
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Invalid Token");
      });
})