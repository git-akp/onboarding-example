import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import dataSource from "../lib/dataSource";

export const useOnboarding = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const goToNextQuestion = useCallback(
    (flowQuestions: string[], lastCompletedQuestion?: string) => {
      if (lastCompletedQuestion && flowQuestions?.length) {
        const nextQuestionIndex =
          flowQuestions.findIndex(
            (questionName) => questionName === lastCompletedQuestion
          ) + 1;
        if (nextQuestionIndex <= flowQuestions.length - 1) {
          navigate(`/onboarding/${flowQuestions[nextQuestionIndex]}`);
        }
      } else {
        navigate(`onboarding/${flowQuestions?.[0]}`);
      }
    },
    [navigate]
  );

  const startOnboarding = useCallback(
    async (sessionId?: string) => {
      const res = await dataSource.startOnboarding(sessionId);
      if (res) {
        if (res?.sessionId) {
          user.maybeSetSessionId(res.sessionId);
        }
        if (res?.user) {
          user.setUser(res.user);
        }
        if (res?.flowQuestions && res.flowQuestions.length) {
          user.setFlowQuestions(res.flowQuestions);
          goToNextQuestion(res.flowQuestions, res?.user?.lastCompletedQuestion);
        }
      }
    },
    [user, goToNextQuestion]
  );

  return {
    startOnboarding,
    goToNextQuestion,
  };
};
