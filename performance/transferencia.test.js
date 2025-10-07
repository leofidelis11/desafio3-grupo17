import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  iterations: 2,
};

export function setup() {
  const loginRes = http.post('http://localhost:3000/users/login', JSON.stringify({
    username: 'julio.lioma',
    password: '123456'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  const token = loginRes.json('token');
  if (!token) {
    console.error('Token não foi retornado:', loginRes.body);
  }
  return { token };
}

export default function ({ token }) {
  const res = http.get('http://localhost:3000/transfers', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('Resposta:', res.body);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'resposta contém transferências': (r) => Array.isArray(r.json('transferencias')),
  });

  sleep(1);
}