import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import EditQuestion from "./EditQuestion";

import { getOneSurveyFormat } from "../../services/survey-constructors";
import { putAnswer, getSurveyAnswers } from "../../services/answers";

export default function SurveyContainer(props) {
  const { currentUser, surveyFormat, activeSurveyID, setPendingSurvey } = props;
  const [surveyData, setSurveyData] = useState([]);
  const [originalAnswers, setOriginalAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitEditAnswers, setSubmitEditAnswers] = useState(false);
  const history = useHistory();

  const [surveyAnswers, setSurveyAnswers] = useState([]);

  // Answer Functions

  const handleSubmit = async (surveyAnswers) => {
    console.log(surveyAnswers);
    setSubmitEditAnswers(!submitEditAnswers);
    console.log(surveyAnswers);
  };

  // UseEffects Below:

    // Grabs Survey-specific data including questions & options

    useEffect(() => {
      if (surveyFormat !== null) {
        const getSurveyData = async () => {
          const rawSurveyData = await getOneSurveyFormat(surveyFormat.id);
          setSurveyData(rawSurveyData);
        };
        getSurveyData(surveyFormat.id);
      }
    }, []);
  
  // Gathers Previous Answers To Edit using Survey ID reference

    useEffect(() => {
      if (activeSurveyID !== null) {
        const getEditAnswers = async () => {
          const rawData = await getSurveyAnswers(activeSurveyID);
          const data = rawData.data;
          const rawAnswers = data.answers;
          console.log(rawAnswers);
          setOriginalAnswers(rawAnswers);
        };
        getEditAnswers(activeSurveyID);
      }
    }, []);

  // Submits Answers upon submitEditAnswersStateChange 
  
  useEffect(() => {
    if (surveyAnswers.length !== 0) {
      Promise.all(
        surveyAnswers.map((pendingAnswer) => {
          const answerID = pendingAnswer.id;
          console.log(pendingAnswer);
          console.log(answerID);
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
  }, [submitEditAnswers]);

  // Below Function Maps out Survey Questions

  const surveyQuestions =
    surveyData.questions &&
    surveyData.questions.map((question, index) => (
      <EditQuestion
        // Data
        currentUser={currentUser}
        question={question}
        index={index}
        totalQuestions={surveyData.questions.length - 1}
        // Functions
        handleSubmit={handleSubmit}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        submitEditAnswers={submitEditAnswers}
        // Data Forms
        surveyAnswers={surveyAnswers}
        setSurveyAnswers={setSurveyAnswers}
        originalAnswers={originalAnswers}
      />
    ));

  return (
    <>
      {surveyData === undefined ? (
        <div className="loader"></div>
      ) : (
        <div className="edit-container">{surveyQuestions}</div>
      )}
    </>
  );
}
