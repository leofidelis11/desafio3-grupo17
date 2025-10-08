require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const { obterToken } = require('../helpers/autenticacaoAPI');


const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('Transfer', () => {
  let token;

  before(async () => {
    token = await obterToken();
  });

  describe('Autenticação', () => {
    it('Deve retornar erro 401 ao Token não fornecido ou inválido', async () => {
      const resposta = await request(BASE_URL)
        .get('/transfers');
      
      expect(resposta.status).to.equal(401);
      expect(resposta.body.message).to.equal('Token não fornecido.');
    })
  })

 
describe('GET /transfers - Lista de transferências', () => {
    it('Deve listar todas as transferências', async () => {
      const resposta = await request(BASE_URL)
        .get('/transfers')
        .set('Authorization', `Bearer ${token}`);

      console.log('Status:', resposta.status)
      console.log('Body:', resposta.body)

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array');
      
      if (resposta.body.length > 0) {
        expect(resposta.body[0]).to.have.property('id')
        expect(resposta.body[0]).to.have.property('from')
        expect(resposta.body[0]).to.have.property('to')
        expect(resposta.body[0]).to.have.property('value')
      }
    });
  });

  describe('GET /transfers - Paginação de transferências', () => {
  it('Deve retornar 2 elementos na página 1 quando o limite for de 1 registros', async () => {
    const resposta = await request(BASE_URL)
      .get('/transfers?page=1&limit=4')
      .set('Authorization', `Bearer ${token}`)

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.be.an('array')
    expect(resposta.body.length).to.be.at.most(2)
  })
})
})