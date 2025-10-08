import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '5s', target: 5 },   // Sobe para 5 VUs em 5s
    { duration: '10s', target: 10 }, // Mantém 10 VUs por 10s
    { duration: '5s', target: 0 }    // Finaliza
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% das requisições em menos de 2s
    http_req_failed: ['rate<0.01'],     // Menos de 1% de falhas
  },
}

export default function () {
  const BASE_URL = 'http://localhost:3000'

  // 1. Login
  const loginPayload = JSON.stringify({
    username: 'julio',
    password: '123456'
  })

  const loginHeaders = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const loginRes = http.post(`${BASE_URL}/users/login`, loginPayload, loginHeaders)
  const token = loginRes.json().token

  check(loginRes, {
    'Login status 200': (r) => r.status === 200,
    'Token é string': (r) => typeof token === 'string' && token.length > 0
  })

  // 2. Transferência válida
  const transferPayload = JSON.stringify({
    from: 'priscila',
    to: 'julio',
    value: 0.01
  })

  const transferHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  const transferRes = http.post(`${BASE_URL}/transfers`, transferPayload, transferHeaders)

  // 3. Checar se status é 201
  check(transferRes, {
    'Transferência status 201': (r) => r.status === 201,
  })

  // 4. Log dos erros (opcional para depuração)
  if (transferRes.status !== 201) {
    console.log(`Erro: Status ${transferRes.status} | Body: ${JSON.stringify(transferRes.json())}`)
  }

  sleep(1) // aguarda 1 segundo entre execuções
}

