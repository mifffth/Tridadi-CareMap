import { baseUrl } from '../API/api.js';

export async function fetchStories() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token tidak ditemukan.');

  const response = await fetch(`${baseUrl}/stories?location=0`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Gagal memuat cerita');
  }

  const data = await response.json();
  return data.listStory;
}

export async function submitStory(formData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token tidak ditemukan.');

  const url = `${baseUrl}/stories${token ? '' : '/guest'}`;

  const response = await fetch(url, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
  });

  const data = await response.json();
  if (data.error) {
      throw new Error(data.message || 'Terjadi kesalahan');
  }

  return data;
}
