import app from "../server.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", function () {
  it("temperature information when cityName is valid", async function () {
    const response = await request
      .post("/weather")
      .send({ cityName: "London" });

    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("Temperature");
  });
});