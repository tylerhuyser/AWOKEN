import handleEditAnswer from "../CRUD/PUT/handleEditAnswer"
import { destroyAnswer } from "../../services/answers"

export default async function routeEditSelectAllAnswers(originalAnswer, relevantCompletedAnswers) {
    if (relevantCompletedAnswers.filter((completedAnswer, index) => ((completedAnswer.option_id === originalAnswer.option_id) && (completedAnswer.free_response === originalAnswer.free_response)) === 1)) {
      return
    }
    else if (relevantCompletedAnswers.filter((completedAnswer, index) => ((completedAnswer.option_id === originalAnswer.option_id) && (completedAnswer.free_response !== originalAnswer.free_response)) === 1)) {
      return handleEditAnswer(originalAnswer.id, relevantCompletedAnswers[0])
    }
    else if (relevantCompletedAnswers.filter((completedAnswer, index) => completedAnswer.option_id === originalAnswer.option_id) === 0) {
      return destroyAnswer(originalAnswer.id)
    }
}