const request = require("supertest");
const app = require("../app");
const { Product, Category, User, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
//fix ini susaaaaaaaaaaaaaah
let product;
let user;

beforeAll(async () => {
    user = await User.create({
        username: "testuser",
        email: "testuser@example.com",
        password: "testpassword",
      });
  await Category.create({
    id: 1,
    name: "testCategory",
  });

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


describe("GET /pub", () => {
    test("should successfully get public products without filter params", async () => {
        const response = await request(app).get("/pub");
    
        expect(response.status).toBe(200);
        
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBe(1);

        const firstProduct = response.body.data[0];
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

      test("should successfully get public products with one query filter params", async () => {
        const filterParam = "Test Product";
        const response = await request(app).get(`/pub?name=${filterParam}`);
    
        expect(response.status).toBe(200);
    
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBe(1);
    
        const filteredProduct = response.body.data[0];
        expect(filteredProduct.name).toBe(filterParam);
      });

      test("should successfully get public products with pagination", async () => {
        const pageSize = 10;
        const pageNumber = 1;
        const response = await request(app).get(`/pub?page=${pageNumber}&pageSize=${pageSize}`);
    
        expect(response.status).toBe(200);

        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBe(1);
      });
})

describe("GET /pub/:id", () => {
    test("should be able to get list public products by id", async () => {
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
          .get("/pub/1")
    
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    
        const firstProduct = response.body;
    
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

      test("should fail to get product with invalid product ID", async () => {
        const invalidProductId = 9999;
        const response = await request(app)
          .get(`/pub/${invalidProductId}`)
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Data not found");
      });
})