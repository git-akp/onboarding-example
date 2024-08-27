export enum OnboardingFlowQuestions {
  FIRST = 'initial_question',
  SECOND = 'second_question',
  THIRD = 'third_question',
  LAST = 'final_question',
}

export enum OnboardingFlowVariants {
  DEFAULT = 'all_questions',
  SKIP_SECOND = 'skip_second_question',
  SKIP_THIRD = 'skip_third_question',
  FIRST_AND_LAST = 'first_and_last_only',
}
