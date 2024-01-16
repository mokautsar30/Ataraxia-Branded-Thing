const request = require("supertest");
const app = require("../app");
const { Product, Category, User, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");


let access_token;
let user;

beforeAll(async () => {
    await Category.create({
      name: "testCategory",
    });
    user = await User.create({
      email: "test11@gmail.com",
      password: "testpassword12",
      phoneNumber: "222-222-2222",
      address: "testaddres",
      username: "username test",
      role: "Admin",
    });
    user = await User.findOne({
        where: {
            email: "test@gmail.com",
        }
    
      });
    access_token = signToken(user);
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

    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
  });


  describe("POST /login", () => {
    test("Login with invalid email", async () => {
        const loginUser = {
            email: "jdjdjdjdj@mail.com",
            password: "testpassword12"
        }
    
        const response = await request(app)
        .post("/login")
        .send(loginUser)
        .set("Authorization", `Bearer ${access_token}`);
    
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid email / password");
      })
    
      test("Login with invalid password", async () => {
        const loginUser = {
            email: "test@gmail.com",
            password: "jddhadhjahjaf"
        }
    
        const response = await request(app)
        .post("/login")
        .send(loginUser)
        .set("Authorization", `Bearer ${access_token}`);
    
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid email / password");
      })
    
      test("Login when password is empty", async () => {
        const loginUser = {
            email: "test@gmail.com",
            password: ""
        }
    
        const response = await request(app)
        .post("/login")
        .send(loginUser)
        .set("Authorization", `Bearer ${access_token}`);
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Password is required");
      })
    
      test("Login when email is empty", async () => {
        const loginUser = {
            email: "",
            password: "testpassword12"
        }
    
        const response = await request(app)
        .post("/login")
        .send(loginUser)
        .set("Authorization", `Bearer ${access_token}`);
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Email is required");
      })
  })


  describe("POST /register", () => {
    test("Successfully register new staff", async () => {
        const newStaff = {
            email: "testStaff11@gmail.com",
            password: "staffpassword111",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("email", newStaff.email);
    })

    test("register new staff without provided email", async () => {
        const newStaff = {
            password: "staffpassword111",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Email is required");
    })

    test("register new staff without provided password", async () => {
        const newStaff = {
            email: "testStaff11@gmail.com",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Password is required");
    })

    test("register new staff with empty string email", async () => {
        const newStaff = {
            email: "",
            password: "staffpassword111",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Email is required");
    })

    test("register new staff with empty string email", async () => {
        const newStaff = {
            email: "testStaff@gmail.com",
            password: "",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Password is required");
    })

    test("register new staff with existed email", async () => {
        const newStaff = {
            email: "test@gmail.com",
            password: "staffpassword111",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "This email is already exist");
    })

    test("register new staff with invalid email format", async () => {
        const newStaff = {
            email: "invalid_email_format",
            password: "staffpassword111",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Email format must be an Email");
    })

    test("Failed to register staff because admin is not login", async () => {

        const newStaff = {
            email: "invalid_email_format",
            password: "staffpassword111",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Invalid Token");
    })

    test("register new staff with invalid token", async () => {
        
        const newStaff = {
            email: "invalid_email_format",
            password: "staffpassword111",
            phoneNumber: "333-333-3333",
            address: "teststaffaddres",
            username: "staffusername"
        }

        const response = await request(app)
        .post("/register")
        .send(newStaff)

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Invalid Token");
    })
  })

  


  


