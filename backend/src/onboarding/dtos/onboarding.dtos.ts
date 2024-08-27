import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { OnboardingFlowQuestions } from '../enums/onboarding.enums';

export class StartOnboardingDTO {
  @IsOptional()
  @IsUUID()
  sessionId: UUID;
}

export class SubmitAnswerDTO {
  @IsUUID()
  sessionId: UUID;

  @IsEnum(OnboardingFlowQuestions)
  questionName: string;

  @IsNotEmpty()
  questionAnswer: string | number;
}
