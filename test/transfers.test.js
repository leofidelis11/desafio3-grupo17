require('dotenv').config()
const request = require('supertest')
const { expect } = require('chai')
const { obterToken } = require('../helpers/autenticacaoAPI')

describe('Transfers', () => {
  let token;

  before(async () => {
    token = await obterToken()
  });
 
  describe('POST /transfers', () => {
      it('Deve listar todas as transferências', async () => {
        const resposta = await request(process.env.BASE_URL)
          .post('/transfers')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
                  "from": "julio",
                  "to": "priscila",
                  "value": 10
                })
              
        expect(resposta.status).to.equal(201);
        expect(resposta.body.from).to.equal('julio');
        expect(resposta.body.to).to.equal('priscila');
        expect(resposta.body.value).to.equal(10);
      })
    })

  describe('GET /transfers', () => {
    it('Deve listar transferências', async () => {
      const resposta = await request(process.env.BASE_URL)
        .get('/transfers')
        .set('Authorization', `Bearer ${token}`)

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array')
    })
  })
})