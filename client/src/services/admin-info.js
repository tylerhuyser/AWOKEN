import api from './api-config'

export const getAllCompanies = async () => {
  const resp = await api.get('/companies');
  return resp.data;
}

export const getOneCompany = async (id) => {
  const resp = await api.get(`/companies/${id}`)
  return resp.data;
}

export const getAllEmplpoyees = async () => {
  const resp = await api.get('/employees');
  return resp.data;
}

export const getOneEmployee = async (id) => {
  const resp = await api.get(`/employees/${id}`)
  return resp.data;
}