import { destroyAnswer } from "../../../services/answers"

export default async function handleDeleteAnswers(completedSurveyAnswers, editAnswers) {
  Promise.all(
    editAnswers.map((answer) => {
      if (completedSurveyAnswers.filter(completedAnswer => completedAnswer.id === answer.id) === 0) {
        return destroyAnswer(answer.id)
      }
    })
  )
}