import api from './api-config'

export const getAllSurveys = async () => {
  const resp = await api.get('/surveys');
  return resp.data;
}

export const getOneSurvey = async (id) => {
  const resp = await api.get(`/surveys/${id}`);
  return resp.data;
}

export const postSurvey = async (sureyData) => {
  const resp = await api.post(`/surveys`, {survey: surveyData});
  return resp.data;
}

export const putSurvey = async (id, sureyData) => {
  const resp = await api.post(`/surveys/${id}`, {survey: surveyData});
  return resp.data;
}

export const destroySurvey = async (id) => {
  const resp = await api.delete(`/surveys/${id}`);
  return resp;
}