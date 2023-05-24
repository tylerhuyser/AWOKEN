import { putAnswer } from "../../../services/answers"

export default async function handleEditAnswer (originalAnswerID, revisedAnswerData) {
  const editedAnswer = await putAnswer(originalAnswerID, revisedAnswerData)
  console.log(`Edited Answer Below:`)
  console.log(editedAnswer)
  return editedAnswer
}