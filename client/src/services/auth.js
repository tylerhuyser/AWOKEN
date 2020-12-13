import api from './api-config';

export const loginEmployee = async (loginData) => {
  const resp = await api.post('/auth/login', { authentication: loginData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.employee
}

export const registerEmployee = async (registerData) => {
  const resp = await api.post('/employees/', { employee: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.employee
}

export const verifyEmployee = async () => {
  const token = localStorage.getItem('authToken');
  console.log(token)
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    try {
      const resp = await api.get('/auth/verify');
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
  return null
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null
}