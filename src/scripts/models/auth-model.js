import { baseUrl } from '../API/api.js';
const TOKEN_KEY = 'token';

export async function loginUser(email, password) {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
 
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Login gagal');
  return result.loginResult.token;
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || 'Register gagal');

  const token = result?.registerResult?.token || '';
  if (token) {
    localStorage.setItem('token', token);
  }

  return {
    token,
    message: result.message || 'Pendaftaran berhasil',
    error: false,
  };
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
