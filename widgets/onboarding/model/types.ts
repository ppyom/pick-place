export type OnboardingStepId = 'interests' | 'companion' | 'region';

export type SelectionMode = 'single' | 'multi';

export interface OnboardingOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface OnboardingStepConfig {
  id: OnboardingStepId;
  title: string;
  description?: string;
  selectionMode: SelectionMode;
  options: OnboardingOption[];
}

export type OnboardingSelection = Record<OnboardingStepId, string[]>;
