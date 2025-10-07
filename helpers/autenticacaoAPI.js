const request = require('supertest');

const obterToken = async (usuario, senha) => {
    const respostaLogin = await request('http://localhost:3000')
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': 'julio',
            'password': '123456'
        })
    
    return respostaLogin.body.token
}

module.exports = {
    obterToken
}