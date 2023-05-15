import { destroySurvey } from '../../../services/surveys'

export default async function deleteJournal(id, isDeleted, setIsDeleted) {
  await destroySurvey(id)
  setIsDeleted(!isDeleted)
}