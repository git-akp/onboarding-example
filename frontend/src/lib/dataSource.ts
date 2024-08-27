import axios, { AxiosInstance } from "axios";

class DataSource {
  private server: AxiosInstance;
  constructor() {
    this.server = axios.create({
      baseURL: "http://localhost:3005",
    });
  }
  startOnboarding = async (sessionId?: string) => {
    try {
      const payload = sessionId ? { sessionId } : null;
      const res = await this.server.post("/onboarding/start", payload);
      if (res?.data) return res.data;
    } catch (e) {
      // Logging
    }
  };
  getQuestion = async (questionName: string) => {
    try {
      const res = await this.server.get(
        `/onboarding/question?name=${questionName}`
      );
      if (res?.data) return res.data;
    } catch (e) {
      // Logging
    }
  };
  submitAnswer = async (submitAnswerPayload: any) => {
    try {
      const res = await this.server.post(
        "/onboarding/answer",
        submitAnswerPayload
      );
      if (res?.data) return res.data;
    } catch (e) {
      // Logging
    }
  };
}

const dataSource = new DataSource();
export default dataSource;
