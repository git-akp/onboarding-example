import { Injectable } from '@nestjs/common';
import {
  OnboardingFlowQuestions,
  OnboardingFlowVariants,
} from './enums/onboarding.enums';
import { OnboardingFlowMap } from './flows/onboarding.flows';
import { randomUUID } from 'crypto';
import { StartOnboardingDTO, SubmitAnswerDTO } from './dtos/onboarding.dtos';
import { dataStore } from 'src/temp/dataStore';
import { OnboardingUser } from 'src/models/user.model';
import { OnboardingQuestionsMap } from './questions/onboarding.questions';

const onboardingVariants = [
  OnboardingFlowVariants.DEFAULT,
  OnboardingFlowVariants.FIRST_AND_LAST,
  OnboardingFlowVariants.SKIP_SECOND,
  OnboardingFlowVariants.SKIP_THIRD,
];

@Injectable()
export class OnboardingService {
  healthCheck() {
    return 'Onboarding Service - Ok!';
  }

  startOnboarding({ sessionId: existingSessionId }: StartOnboardingDTO) {
    if (dataStore[existingSessionId]) {
      const existingUser = dataStore[existingSessionId];
      const questions = OnboardingFlowMap[existingUser.flowVariant];
      return {
        user: dataStore[existingSessionId],
        flowVariant: existingUser.flowVariant,
        flowQuestions: questions,
      };
    }
    const sessionId = randomUUID();
    const flowVariant = onboardingVariants[Math.floor(Math.random() * 4)];
    const flowQuestions = OnboardingFlowMap[flowVariant];
    dataStore[sessionId] = {
      sessionId,
      flowVariant,
    } as OnboardingUser;
    return {
      sessionId,
      flowVariant,
      flowQuestions,
    };
  }

  submitAnswer({ sessionId, questionName, questionAnswer }: SubmitAnswerDTO) {
    if (!dataStore[sessionId]) {
      dataStore[sessionId] = {} as OnboardingUser;
    }
    const user = dataStore[sessionId];
    switch (questionName) {
      case OnboardingFlowQuestions.FIRST:
        user.firstQuestionAnswer = questionAnswer;
        break;
      case OnboardingFlowQuestions.SECOND:
        user.secondQuestionAnswer = questionAnswer;
        break;
      case OnboardingFlowQuestions.THIRD:
        user.thirdQuestionAnswer = questionAnswer;
        break;
      case OnboardingFlowQuestions.LAST:
        user.lastQuestionAnswer = questionAnswer;
        break;
      default:
    }
    user.lastCompletedQuestion = questionName;
    if (questionName === OnboardingFlowQuestions.LAST) {
      user.isOnboardingComplete = true;
    }
    return {
      ...user,
    };
  }

  getQuestion = (questionName: string) => {
    return OnboardingQuestionsMap[questionName];
  };
}
