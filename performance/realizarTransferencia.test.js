import http from 'k6/http'
import { check, sleep } from 'k6'
import { obterToken } from '../helpers/autenticacaoPerformance.js'

export const options = {
  VUS: 50,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<3000'],
  },
}

export default function () {
    const token = obterToken()

    const url = 'http://localhost:3000/transfers';

    const payload = JSON.stringify({  
      from: "julio",
      to: "priscila",
      value: 10
      })
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  
    const resposta = http.post(url, payload, params);

    check(resposta, {
      'Status é 201': (r) => r.status === 201
    })

  sleep(1)
}