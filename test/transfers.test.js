const request = require('supertest')
const { expect } = require('chai')

let token // variável para armazenar o token obtido no login

describe('Transfers', () => {
  before(async () => {
    // Autentica o usuário para obter o token
    const login = await request('http://localhost:3000')
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'julio',
        password: '123456'
      })

    token = login.body.token
    expect(token).to.be.a('string')
  })

  describe('POST /transfers', () => {
    it('Deve retornar 400 se enviar dados inválidos', async () => {
      const resposta = await request('http://localhost:3000')
        .post('/transfers')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`) // adiciona o token
        .send({
          from: '',  
          to: '',
          value: -10
        })

      expect(resposta.status).to.equal(400)
      expect(resposta.body).to.have.property('error')
    })

    it('Deve retornar 201 e dados da transferência quando for bem-sucedido', async () => {
      const payload = {
        from: 'julio', // Substitua por contas válidas do seu sistema
        to: 'priscila',
        value: 1.50
      }

      const resposta = await request('http://localhost:3000')
        .post('/transfers')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`) // adiciona o token
        .send(payload)

      expect(resposta.status).to.equal(201)
      expect(resposta.body).to.be.an('object')
      expect(resposta.body).to.have.property('from', 'julio')
      expect(resposta.body).to.have.property('to', 'priscila')
      expect(resposta.body).to.have.property('value', 100.5)
    })    
  })
})
