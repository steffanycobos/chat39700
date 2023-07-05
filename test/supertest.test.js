import chai from "chai";
import supertest from "supertest";


const expect= chai.expect
const requester=supertest('http://localhost:8080')

describe('Testing Avanzado',()=>{
    describe('Test de Registro',()=>{
        it('El endpoint POST /api/sessions/signup debe registrar un usuario', async()=>{
        
             const userMock={
                first_name:'Steffany',
                last_name:'Cobos',
                age:28,
                email:'cobosleanwwdra2@gmail.com',
                password:'asdfg',
             }
             const result= await requester.post('/api/sessions/signup').send(userMock)
            //console.log(result)
         expect(result).to.be.ok

        
    })
    describe('Test Cookie/Logueo', async()=>{
        it(' El endpoint /api/sessions/login loguea usuario y devuelve una cookie',async ()=>{
            let cookie;
            const userMock= {
          email:'usuario@gmail.com',
          password: '1234'
            }
        const result= await requester.post('/api/sessions/login').send(userMock)
        const cookieResult= result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok;

        cookie={
            name:cookieResult.split('-')[0],
            value:cookieResult.split('-')[1]
        }

        expect(cookie.name).to.be.ok;
       

         })
        })

    })
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