import http from 'k6/http';
import { check, sleep } from 'k6';
import { obterToken } from '../helpers/autenticacaoPerformance.js'

export const options = {
  VUS: 50,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<3000'],
  },
};

export default function () {
    const token = obterToken()
    
    const url = 'http://localhost:3000/transfers';
      
    const params = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    }
  
    const resposta = http.get(url, params);
    
    check(resposta, {
        'Status é 200': (r) => r.status === 200
    })
    
    sleep(1)
}