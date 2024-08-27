import { IQuestion } from 'src/models/question.model';
import { OnboardingFlowQuestions } from '../enums/onboarding.enums';

interface OnboardingQuestionsMap {
  [onboardingFlowQuestion: string]: IQuestion;
}

export const OnboardingQuestionsMap: OnboardingQuestionsMap = {
  [OnboardingFlowQuestions.FIRST]: {
    questionName: OnboardingFlowQuestions.FIRST,
    questionHeading: 'This is the first question.',
    questionSubHeading: '',
    questionOptions: ['A', 'B', 'C', 'D'],
  },
  [OnboardingFlowQuestions.SECOND]: {
    questionName: OnboardingFlowQuestions.SECOND,
    questionHeading: 'This is the second question.',
    questionSubHeading: '',
    questionOptions: ['E', 'F', 'G', 'H'],
  },
  [OnboardingFlowQuestions.THIRD]: {
    questionName: OnboardingFlowQuestions.THIRD,
    questionHeading: 'This is the third question.',
    questionSubHeading: '',
    questionOptions: ['I', 'J', 'K', 'L'],
  },
  [OnboardingFlowQuestions.LAST]: {
    questionName: OnboardingFlowQuestions.LAST,
    questionHeading: 'This is the last question.',
    questionSubHeading: '',
    questionOptions: ['M', 'N', 'O', 'P'],
  },
};
