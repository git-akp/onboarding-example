import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { StartOnboardingDTO, SubmitAnswerDTO } from './dtos/onboarding.dtos';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}
  @Get('health')
  healthCheck(): string {
    return this.onboardingService.healthCheck();
  }
  @Get('question')
  getQuestion(@Query('name') questionName: string): any {
    return this.onboardingService.getQuestion(questionName);
  }
  @Post('start')
  startOnboarding(@Body() startOnboardingPayload: StartOnboardingDTO): any {
    return this.onboardingService.startOnboarding(startOnboardingPayload);
  }
  @Post('answer')
  submitAnswer(@Body() submitAnswerPayload: SubmitAnswerDTO): any {
    return this.onboardingService.submitAnswer(submitAnswerPayload);
  }
}
