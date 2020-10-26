import api from './api-config'

export const getAllAnswers = async () => {
  const resp = await api.get('/answers');
  return resp.data;
}

export const getOneAnswer = async (id) => {
  const resp = await api.get(`/answers/${id}`)
  return resp.data;
}

export const postAnswer = async (answerData) => {
  const resp = await api.post('/answers', { answer: answerData });
  return resp.data;
}

export const putAnswer = async (id, answerData) => {
  const resp = await api.put(`/answers/${id}`, { answer: answerData });
  return resp.data;
}

export const destroyAnswer = async (id) => {
  const resp = await api.delete(`/answers/${id}`);
  return resp;
}

export const getSurveyAnswers = async (id) => {
  const resp = await api.get(`/surveys/${id}/answers`);
  return resp;
}


