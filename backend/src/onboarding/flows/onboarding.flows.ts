import {
  OnboardingFlowQuestions,
  OnboardingFlowVariants,
} from '../enums/onboarding.enums';

interface OnboardingFlows {
  [onboardingVariant: string]: OnboardingFlowQuestions[];
}

export const OnboardingFlowMap: OnboardingFlows = {
  [OnboardingFlowVariants.DEFAULT]: [
    OnboardingFlowQuestions.FIRST,
    OnboardingFlowQuestions.SECOND,
    OnboardingFlowQuestions.THIRD,
    OnboardingFlowQuestions.LAST,
  ],
  [OnboardingFlowVariants.SKIP_SECOND]: [
    OnboardingFlowQuestions.FIRST,
    OnboardingFlowQuestions.THIRD,
    OnboardingFlowQuestions.LAST,
  ],
  [OnboardingFlowVariants.SKIP_THIRD]: [
    OnboardingFlowQuestions.FIRST,
    OnboardingFlowQuestions.SECOND,
    OnboardingFlowQuestions.LAST,
  ],
  [OnboardingFlowVariants.FIRST_AND_LAST]: [
    OnboardingFlowQuestions.FIRST,
    OnboardingFlowQuestions.LAST,
  ],
};
