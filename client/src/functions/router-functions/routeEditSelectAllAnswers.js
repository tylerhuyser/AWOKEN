import handleEditAnswer from "../CRUD/PUT/handleEditAnswer"
import { destroyAnswer } from "../../services/answers"

export default async function routeEditSelectAllAnswers(originalAnswer, relevantCompletedAnswers) {
  if (relevantCompletedAnswers.filter((completedAnswer) => ((completedAnswer.option_id === originalAnswer.option_id) && (completedAnswer.free_response === originalAnswer.free_response))).length === 1) {
    console.log('Nothing Happened')
    console.log(relevantCompletedAnswers.filter((completedAnswer) => ((completedAnswer.option_id === originalAnswer.option_id) && (completedAnswer.free_response === originalAnswer.free_response))).length)
      return
    }
  else if (relevantCompletedAnswers.filter((completedAnswer) => ((completedAnswer.option_id === originalAnswer.option_id) && (completedAnswer.free_response !== originalAnswer.free_response))).length === 1) {
      console.log('Edit Answer')
      return await handleEditAnswer(originalAnswer.id, relevantCompletedAnswers.filter((completedAnswer) => ((completedAnswer.option_id === originalAnswer.option_id) && (completedAnswer.free_response !== originalAnswer.free_response)))[0])
    }
  else if (relevantCompletedAnswers.filter((completedAnswer) => completedAnswer.option_id === originalAnswer.option_id).length === 0) {
      console.log('Destroy Answer')
      return await destroyAnswer(originalAnswer.id)
    }
}