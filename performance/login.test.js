import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000', 'max<3000'],
        http_req_failed: ['rate<0.01']
    }
}

export default function () {
    const url = 'http://localhost:3000/users/login'

    const payload = JSON.stringify({
        username: 'julio',
        password: '123456'
      })

    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    }

    const res = http.post(url, payload, params)

    check(res, {
        'Validar que o Status é 200': (r) => r.status === 200,
        'Validar que o Token é string': (r) => typeof(r.json().token) == 'string'  
    })

    sleep(1)
}