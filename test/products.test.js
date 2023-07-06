import chai from "chai";
import supertest from "supertest";


const expect= chai.expect
const requester=supertest('http://localhost:8080')

describe('Testing Avanzado',()=>{
   
   describe('Test Products',()=>{
        it('El endpoint POST /api/products/add debe de crear un producto, cuyo owner sera el usuario conectado', async()=>{
            const productMock = {
                title:"Camisa",
                description:'Azul claro.',
                price:100,
                thumbnail:'Sin Imagen',
                code:'0258',
                stock:14

            }
           const result= await requester.post('/api/products/add').send(productMock)
           
           expect(result).to.be.ok
        })
    })
})