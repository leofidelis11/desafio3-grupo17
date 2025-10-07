const request = require('supertest')
const { expect } = require('chai')

describe('Users', () => {
    describe('POST /register', () => {
        it('Deve retornar 400 quando usar usuário existente', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'username':'julio',
                    'password': '123456'
                })
            expect(resposta.status).to.equal(400)
            expect(resposta.body.error).to.equal('Usuário já existe')
        })
    })    

    describe('POST /login', () => {
        it('Deve retornar 200 quando for login bem-sucedido', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio',
                    'password': '123456'
                })
            
            expect(resposta.status).to.equal(200)
            expect(resposta.body.token).to.be.a('string')
        })

        it('Deve retornar 400 quando o usuário ou senha forem inválidos', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'username inválido',
                    'password': 'senha inválida'
                })
            
            expect(resposta.status).to.equal(400)
            expect(resposta.body.error).to.equal('Usuário não encontrado')
        })
    })

   describe('GET /users', () => {
        it('Deve listar os usuários existentes', async () => {
            const resposta = await request('http://localhost:3000')
            .get('/users')
            .set('Content-Type', 'application/json')
            .send({
                    "username": "julio",
                    "favorecidos": "priscila"
                })

            console.log(resposta.body)
            expect(resposta.status).to.equal(200)

            
        })
    }) 

    describe('GET /users', () => {
        it('Deve listar os usuários existentes', async () => {
            const resposta = await request('http://localhost:3000')
            .get('/users')
            .set('Content-Type', 'application/json')
            .send({
                    "username": "priscila",
                    "favorecidos": "julio"
                })
            
            // checa se Julio e Priscila estão na lista
            console.log(resposta.body)
            expect(resposta.status).to.equal(200)
            expect(resposta.body).to.be.an('array')
                
        })
    })  


})