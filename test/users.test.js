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
})