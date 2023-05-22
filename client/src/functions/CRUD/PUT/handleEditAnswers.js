import { putAnswer } from "../../../services/answers";

export default async function handleEditAnswers() {
  Promise.all(
    surveyAnswers.map((pendingAnswer) => {
      const answerID = pendingAnswer.id;
      const updateAnswers = async (answerID, pendingAnswer) => {
        const editedAnswer = await putAnswer(answerID, pendingAnswer);
        return editedAnswer;
      };
      return updateAnswers(answerID, pendingAnswer);
    })
  );
  history.push("/journals");
  setPendingSurvey(false);
}