import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataSource from "../lib/dataSource";
import { IQuestion, Question } from "../components/Question";
import { UserContext } from "../contexts/UserContext";
import { useOnboarding } from "../hooks/useOnboarding";

export const Onboarding = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { goToNextQuestion } = useOnboarding();
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(
    {} as IQuestion
  );
  const params = useParams();
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData = await dataSource.getQuestion(
        params.questionName || ""
      );
      setCurrentQuestion(questionData);
    };
    fetchQuestion();
  }, [params]);
  const submitAction = async (answer: any) => {
    const res = await dataSource.submitAnswer({
      sessionId: user.sessionId,
      questionName: currentQuestion.questionName,
      questionAnswer: answer,
    });
    if (res) {
      user.setUser(res);
    }
    if (res?.isOnboardingComplete) {
      alert("You completed onboarding!");
      navigate("/");
    } else if (res?.lastCompletedQuestion) {
      goToNextQuestion(user.flowQuestions, res.lastCompletedQuestion);
    }
  };
  return (
    <div className="App">
      <Question question={currentQuestion} submitAction={submitAction} />
    </div>
  );
};

export default Onboarding;
