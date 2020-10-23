import api from './api-config'

export const getAllSurveyFormats = async () => {
  const resp = await api.get('/survey_formats');
  return resp.data;
}

export const getOneSurveyFormat = async (id) => {
  const resp = await api.get(`/survey_formats/${id}`);
  return resp.data;
}

export const getAllQuestions = async () => {
  const resp = await api.get('/questions');
  return resp.data;
}

export const getOneQuestion = async (id) => {
  const resp = await api.get(`/question/${id}`);
  return resp.data;
}

export const getAllOptions = async (id) => {
  const resp = await api.get(`/options`);
  return resp.data;
}

export const getOneOption = async (id) => {
  const resp = await api.get(`/options/${id}`);
  return resp.data
}
