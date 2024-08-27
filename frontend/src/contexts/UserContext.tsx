import {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from "react";

interface IUserData {
  sessionId: string;
  firstName: string;
  email: string;
  flowVariant: string;
  firstQuestionAnswer: any;
  secondQuestionAnswer: any;
  thirdQuestionAnswer: any;
  lastQuestionAnswer: any;
  lastCompletedQuestion: string;
  isOnboardingComplete: boolean;
}

interface IUserContext {
  sessionId: string;
  userData: IUserData;
  flowQuestions: string[];
  setUser: (data: IUserData) => void;
  setFlowQuestions: (flowQuestions: string[]) => void;
  maybeSetSessionId: (sessionId: string) => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: any) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [flowQuestions, setFlowQuestions] = useState<string[]>([]);
  const [userData, setUserData] = useState<IUserData>({} as IUserData);

  const setUser = useCallback((data: IUserData) => {
    setUserData(data);
  }, []);

  const maybeSetSessionId = useCallback((id: string) => {
    if (id !== sessionId) {
      window.sessionStorage.setItem("sessionId", id);
      window.localStorage.setItem("sessionId", id);
      setSessionId(id);
    }
  }, []);

  useEffect(() => {
    const existingSessionId =
      window?.sessionStorage?.getItem("sessionId") ||
      window?.localStorage?.getItem("sessionId");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    }
  }, []);

  const user = useMemo(
    () => ({
      sessionId,
      userData,
      flowQuestions,
      setUser,
      setFlowQuestions,
      maybeSetSessionId,
    }),
    [
      sessionId,
      userData,
      flowQuestions,
      setUser,
      setFlowQuestions,
      maybeSetSessionId,
    ]
  );
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
