import chai from "chai";
import supertest from "supertest";
;

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing Avanzado", () => {
  describe("Test de Carts", () => {
    it("El endpoint GET /api/carts debe devolver los carritos existentes", async function () {
      const result = requester.get("/api/carts");
      console.log(result);
      expect((await result).statusCode).to.be.equal(200);
    });
  });
});
