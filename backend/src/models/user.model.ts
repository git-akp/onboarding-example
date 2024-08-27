export interface OnboardingUser {
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
