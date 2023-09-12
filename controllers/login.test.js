/**
 * 1. Отримує в req.body об'єкт з обов'язковими ключами { email: "", password: "" }, з типом даних String;
 * 2. Повертає у відповідь статус-код 200;
 * 3. Повертає у відповідь токен;
 * 4. Повертає у відповідь об'єкт user з 2 полями email и subscription з типом даних String;
 * 5. У разі порожнього тіла запиту викидає помилку з текстом "missing fields";
 * 6. У разі відсутності поля email в запиті викидає помилку з текстом "missing required email field";
 * 7. У разі відсутності поля password в запиті викидає помилку з текстом "missing required password field";
 * 8. У разі невідповідності типу даних поля email викидає помилку з текстом "\"email\" must be a string";
 * 9. У разі невідповідності типу даних поля password викидає помилку з текстом "\"password\" must be a string";
 *
 * Вхідні дані для тестування - "test login with correct data":
 * {"email": "user@example.com, "password": "1234345"} => status 200;
 * {"email": "user@example.com, "password": "1234345"} => "token";
 * {"email": "user@example.com, "password": "1234345"} => "user": {"email": "user@example.com", "subscription": "starter"};
 */

const mongoose = require("mongoose");
const request = require("supertest");
const User = require("../models/user");

const app = require("../app");

const { DB_HOST_TEST, PORT } = process.env;

describe("test login function", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    await User.deleteMany({});
    server.close();
    await mongoose.connection.close();
  });

  test("test register with correct data", async () => {
    const data = {
      email: "user@example.com",
      password: "1234345",
    };

    const { statusCode, body } = await request(app)
      .post("/users/register")
      .send(data);

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(data.email);

    const user = await User.findOne({ email: data.email });
    expect(user.email).toBe(data.email);
  });

  test("test login with correct data", async () => {
    const data = {
      email: "user@example.com",
      password: "1234345",
    };

    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(data);

    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(data.email);
    expect(body.user.subscription).toBe("starter");
    expect(body.token).toBeDefined();
    expect(body.token).toBeTruthy();

    console.log(body.token);

    const user = await User.findOne({ email: data.email });
    expect(user.email).toBe(data.email);
  });
});
