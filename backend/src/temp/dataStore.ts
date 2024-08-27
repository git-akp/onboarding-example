import { OnboardingUser } from 'src/models/user.model';

interface OnboardingDataStore {
  [sessionId: string]: OnboardingUser;
}

export const dataStore: OnboardingDataStore = {};
