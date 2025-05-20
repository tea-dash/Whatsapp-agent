/**
 * Agent Profile Settings
 * 
 * Defines the core personality and behavioral characteristics of the AI agent.
 * Configures the agent's identity, communication style, and workflow preferences.
 * 
 * Configuration can come from:
 * 1. Server-side file storage (if editing via the profile editor UI)
 * 2. Browser localStorage (as fallback if file storage is unavailable)
 * 3. AGENT_PROFILE_SETTINGS environment variable
 * 4. Default settings if none of the above are available
 */

import { 
  LanguageStyle, 
  WorkflowSettings, 
  AgentSettings, 
  AgentProfileSettings 
} from './types';

// Extend the AgentProfileSettings type to include source tracking
interface AgentProfileSettingsWithSource extends AgentProfileSettings {
  _source?: string;
}
import { loadFromLocalStorage, LOCAL_STORAGE_KEYS } from '../storage/local-storage';
import { loadProfileSettings } from '../storage/file-storage';

// Default settings that will be used if no custom settings are found
export const defaultAgentProfileSettings: AgentProfileSettingsWithSource = {
  name: "Amy",
  role: "Assistant / note taker",
  isPersonified: true,
  companyName: "Buildclub",
  companyDescription: "Build Club is a global AI learning and talent platform designed to help individuals and teams rapidly upskill in artificial intelligence through hands-on, project-based learning. It serves as a training campus for AI learners, experts, and builders, offering a fast track to acquiring practical AI skills and certifications.",
  profileImageUrl: "https://a1base-public.s3.us-east-1.amazonaws.com/profile-moving/20250210_1742_Corporate+Serene+Smile_simple_compose_01jkq9gs6rea3v4n7w461rwye2.gif",
  botPurpose: [
    "summarises action items / issues raised during the day.",
    "Assist in organizing and tracking multiple projects efficiently.",
    "Help with product strategy"
  ],
  languageStyle: {
    language: "English",
    tone: [
      "Clear, sharp, direct, and thoughtful with a motivational edge.",
      "Respond concisely, as if via SMS or WhatsApp. Keep it brief and impactful."
    ],
    dialect: "American",
  },
  workflowSettings: {
    workflow: "Technical Guide",
  },
  agentSettings: {
    agent: "Product Guide",
  },
};

/**
 * Get the current agent profile settings with fallback chain:
 * 1. Server-side file storage
 * 2. Browser localStorage
 * 3. Environment variable
 * 4. Default settings
 */
const getAgentProfileSettings = async (): Promise<AgentProfileSettingsWithSource> => {
  // First try to load from file storage via API
  try {
    const fileSettings = await loadProfileSettings();
    if (fileSettings) {
      return { ...fileSettings, _source: 'file_storage' };
    }
  } catch (error) {
    console.error('[PROFILE SETTINGS] Error loading profile settings from API:', error);
    // Continue to next method if API fails
  }
  
  // Next try to load from localStorage (browser only)
  if (typeof window !== 'undefined') {
    const localStorageSettings = loadFromLocalStorage<AgentProfileSettings>(LOCAL_STORAGE_KEYS.AGENT_PROFILE);
    if (localStorageSettings) {
      return { ...localStorageSettings, _source: 'local_storage' };
    }
  }
  
  // Next try environment variable
  if (process.env.AGENT_PROFILE_SETTINGS) {
    try {
      const envSettings = JSON.parse(process.env.AGENT_PROFILE_SETTINGS);
      return { ...envSettings, _source: 'environment_variable' };
    } catch (error) {
      console.error('[PROFILE SETTINGS] Error parsing AGENT_PROFILE_SETTINGS env variable:', error);
      // Continue to defaults if parsing fails
    }
  }
  
  // Fall back to default settings
  return { ...defaultAgentProfileSettings, _source: 'default' };
};

/**
 * Synchronous version for use in contexts where async is not possible
 * This only checks localStorage and defaults, not file storage
 */
const getAgentProfileSettingsSync = (): AgentProfileSettingsWithSource => {
  // Try to load from localStorage (browser only)
  if (typeof window !== 'undefined') {
    const localStorageSettings = loadFromLocalStorage<AgentProfileSettings>(LOCAL_STORAGE_KEYS.AGENT_PROFILE);
    if (localStorageSettings) {
      return localStorageSettings;
    }
  }
  
  // Next try environment variable
  if (process.env.AGENT_PROFILE_SETTINGS) {
    try {
      return JSON.parse(process.env.AGENT_PROFILE_SETTINGS);
    } catch (error) {
      // Continue to defaults if parsing fails
    }
  }
  
  // Fall back to default settings
  return { ...defaultAgentProfileSettings, _source: 'default' };
};

// Export the sync version of settings for immediate use
// This might not have the file storage data, but components can fetch that separately if needed
const agentProfileSettings = getAgentProfileSettingsSync();
export default agentProfileSettings;

// Also export the async getter for components that can wait for the file data
export { getAgentProfileSettings };
