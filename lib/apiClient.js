import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 180000
})

export async function submitTryon(formData) {
  const { data } = await api.post('/tryon', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}

export async function fetchTryonHistory() {
  const { data } = await api.get('/history')
  return data
}
