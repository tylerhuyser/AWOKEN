import { destroySurvey } from '../../../services/surveys'

export default async function handleDeleteSurvey(id, isDeleted, setIsDeleted) {
  await destroySurvey(id)
  setIsDeleted(!isDeleted)
}