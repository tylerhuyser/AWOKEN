import { postAnswer } from "../../services/answers"
import handleEditAnswer from "../CRUD/PUT/handleEditAnswer"
import routeEditSelectAllAnswers from "./routeEditSelectAllAnswers"

export default async function routeEditAnswers (surveyTemplate, completedSurveyAnswers, editAnswers) {

  console.log('Inside RouteEditAnswers')
  console.log(`RouteEditAnswers - COMPLETED SurveyAnswers Below `)
  console.log(completedSurveyAnswers)
  console.log(`RouteEditAnswers - EDIT Answers Below:`)
  console.log(editAnswers)
  
  Promise.all(
    await surveyTemplate.map((question, index) => {

      console.log('RouteEditAnswers - Inside PromiseAll MAP of Survey Question Template')
      console.log(`RouteEditAnswers - Current Mapped Question Below:`)
      console.log(question)
  
      let relevantCompletedAnswers = completedSurveyAnswers.filter(answer => answer.question_id === question.id)
      console.log(`RouteEditAnswers - relevantCompletedAnswers Below:`)
      console.log(relevantCompletedAnswers)
  
      let relevantOriginalAnswers = editAnswers.filter(answer => answer.question_id === question.id)
      console.log(`RouteEditAnswers - relevantOriginalAnswers Below:`)
      console.log(relevantOriginalAnswers)

      if (question.question_format !== "select all that apply") {

        console.log('RouteEditAnswers - PromiseALL - IF Conidtion NOT "Select All That Apply"')
        console.log(`Mapping RouteEditAnswer PUT ${index}`)

        return handleEditAnswer(relevantOriginalAnswers[0].id, relevantCompletedAnswers[0])

      } else if (question.question_format === "select all that apply") {

        console.log('RouteEditAnswers - PromiseALL - IF Condition IS "Select All That Apply"')

        relevantOriginalAnswers.map((originalAnswer, index) => {

          console.log(`RouteEditAnswers - PromiseALL - IF Condition IS "Select ALL That Apply" - Original Answer MAP ${index}`)

          routeEditSelectAllAnswers(originalAnswer, relevantCompletedAnswers)
        })
      
        relevantCompletedAnswers.map((completedAnswer, index) => {

          console.log(`RouteEditAnswers - PromiseALL - IF Conidtion IS "Select ALL That Apply" - Completed Answer MAP ${index}`)

          if (relevantOriginalAnswers.filter(originalAnswer => originalAnswer.option_id === completedAnswer.option_id).length === 0) {

            console.log(`RouteEditAnswers - PromiseALL - IF Conidtion IS "Select ALL That Apply" - Completed Answer MAP ${index} - Post New Answer`)

            return postAnswer(completedAnswer)
          }
        })
    
      }
    })
  )
}