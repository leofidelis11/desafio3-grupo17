import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    VUS: 200,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<2000'],
    },
}

export default function () {
    const url = 'http://localhost:3000/users/register';

    const payload = JSON.stringify({
        username: 'julio',
        password: '123456'
      })
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  
    const resposta = http.post(url, payload, params);

    check(resposta, {
        'Validar que o status code é 400': (r) => r.status === 400,
    })

    sleep(1)
}