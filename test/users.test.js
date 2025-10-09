require('dotenv').config()
const request = require('supertest')
const { expect } = require('chai')

describe('Users', () => {
    describe('POST /register', () => {
        it('Deve retornar 201 quando registrar novo usuário', async () => {
            let randomNumber = Math.random();
            const resposta = await request(process.env.BASE_URL)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'username':'leo' + randomNumber,
                    'password': '123456'
                })
            expect(resposta.status).to.equal(201)
            expect(resposta.body.username).to.equal('leo' + randomNumber)
        })
    })    

    describe('POST /login', () => {
        it('Deve retornar 200 quando for login bem-sucedido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio',
                    'password': '123456'
                })
        
            expect(resposta.status).to.equal(200)
            expect(resposta.body.token).to.be.a('string')
        })
    })

   describe('GET /users', () => {
        it('Deve listar os usuários existentes', async () => {
            const resposta = await request(process.env.BASE_URL)
            .get('/users')
            .set('Content-Type', 'application/json')

            expect(resposta.status).to.equal(200)
            expect(resposta.body[0].username).to.equal('julio')
            
        })
    }) 
})