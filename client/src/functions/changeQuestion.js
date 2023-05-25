import handleNavigation from "./handleNavigation"

export default function changeQuestion(n, totalQuestions, questionCounter, setQuestionCounter, history) {
    
  if ((n === (-1)) && (questionCounter === 0)) {
    handleNavigation(history, '/')
  } else if ((n === (-1)) && (questionCounter !== 0)) {
    setQuestionCounter(questionCounter - 1)
  } else if ((n === 1) && (questionCounter !== totalQuestions)) {
    setQuestionCounter(questionCounter + 1)
  }
}