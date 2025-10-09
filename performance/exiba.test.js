import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    vus: 200,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<2000'],
    },
}

export default function () {
    const url = 'http://localhost:3000/users';

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // Faz a requisição GET
    const resposta = http.get(url, params);

    // Validações 200 Lista de usuários
    check(resposta, {
        'Validar que o status code é 200': (r) => r.status === 200,
    })

    sleep(1)
}