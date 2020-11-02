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

  const survey = {
    survey_format_id: surveyFormat?.id,
  }

  const [surveyAnswers, setSurveyAnswers] = useState([]);

  // Answer Functions

  const handleSubmit = async (surveyAnswers) => {
    setSubmitEditAnswers(!submitEditAnswers);
  };

    // Return Home Function

    const exitSurvey = () => {
      history.push('/home')
      setPendingSurvey(false)
    }

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
          setOriginalAnswers(rawAnswers);
        };
        getEditAnswers(activeSurveyID);
      }
    }, []);

  // Submits Answers upon submitEditAnswersStateChange 
  
  useEffect(() => {
    if (surveyAnswers.length === originalAnswers.length) {
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
    else {
      alert("Please complete all answers in order to continue!")
    }
  }, [submitEditAnswers]);

  // Below Function Maps out Survey Questions

  const surveyQuestions =
    surveyData.questions &&
    surveyData.questions.map((question, index) => (
      <EditQuestion
        // Data
        key={question.id}
        currentUser={currentUser}
        question={question}
        index={index}
        totalQuestions={surveyData.questions.length - 1}
        // Functions
        handleSubmit={handleSubmit}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        submitEditAnswers={submitEditAnswers}
        exitSurvey={exitSurvey}
        // Data Forms
        survey={survey}
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
