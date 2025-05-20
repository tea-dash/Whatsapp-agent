/**
 * Types for the Agent Onboarding Flow
 * Includes both individual and group chat onboarding configurations
 */

export interface OnboardingMessage {
  id: string;
  text: string;
  waitForResponse: boolean;
  order: number;
}

export interface UserField {
  _internalReactKey: string; // Stable key for React rendering
  id: string; // User-editable field ID
  label: string;
  required: boolean;
  description: string;
}

export interface AgenticSettings {
  systemPrompt: string;
  userFields: UserField[];
  finalMessage: string;
}

export interface GroupAgenticSettings {
  systemPrompt: string;
  initialGroupMessage: string;
  userFields: UserField[];
  finalMessage: string;
  participantThreshold: number;
  autoStartOnboarding: boolean;
  reintroduceAgent: boolean;
  reintroductionInterval: number; // in days
}

export interface OnboardingFlow {
  enabled: boolean;
  messages: OnboardingMessage[];
  mode: "agentic";
  agenticSettings: AgenticSettings;
  settings: {
    captureUserPreferences?: boolean;
    askForName?: boolean;
    askForBusinessType?: boolean;
  };
}

export interface GroupOnboardingFlow {
  enabled: boolean;
  mode: "agentic";
  agenticSettings: GroupAgenticSettings;
}

export const defaultOnboardingFlow: OnboardingFlow = {
  enabled: true,
  messages: [],
  mode: "agentic",
  agenticSettings: {
    systemPrompt:
      "You are conducting an onboarding conversation with a new user. Your goal is to make them feel welcome and collect some basic information that will help you assist them better in the future. Be friendly, professional, and conversational.",
    userFields: [
      {
        _internalReactKey: "name-field", // Stable key for React rendering
        id: "name",
        label: "Full Name",
        required: true,
        description: "Ask for the user's full name",
      },
      {
        _internalReactKey: "email-field", // Stable key for React rendering
        id: "email",
        label: "Email Address",
        required: true,
        description: "Ask for the user's email address",
      },
    ],
    finalMessage:
      "Thank you for sharing this information. I've saved your details and I'm ready to help you achieve your goals.",
  },
  settings: {
    captureUserPreferences: false,
    askForName: false,
    askForBusinessType: false,
  },
};

// Group onboarding flow must be loaded from a file
// No default values are provided
