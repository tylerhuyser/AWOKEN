import handleNavigation from "./handleNavigation"

export default function changeQuestion(n, totalQuestions, currentQuestion, setCurrentQuestion, history) {
    
  if ((n === (-1)) && (currentQuestion === 0)) {
    handleNavigation(history, '/')
  } else if ((n === (-1)) && (currentQuestion !== 0)) {
    setCurrentQuestion(currentQuestion - 1)
  } else if ((n === 1) && (currentQuestion !== totalQuestions)) {
    setCurrentQuestion(currentQuestion + 1)
  }
}