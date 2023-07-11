import chai from "chai";
import supertest from "supertest";
;

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing Avanzado", () => {
  describe("Test de Carts", () => {
    it("El endpoint GET /api/carts debe devolver los carritos existentes.", async function () {
      const result = requester.get("/api/carts");
      expect((await result).statusCode).to.be.equal(200);
    });
   
    it("Crea un nuevo carro con un producto.", async function () {
      const mockCart = {
        products: [{ id: "645852264l55k417", quantity: 10 }],
      };
      const result = await requester.post("/api/carts").send(mockCart);
      expect(result.statusCode).to.be.equal(201);
    });
  
  });
});
