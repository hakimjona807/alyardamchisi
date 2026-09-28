export type ToolCategory = 'ai' | 'study' | 'create' | 'productivity' | 'developer';

export type NavigationTab = 
  | 'home'
  | 'ai-chat'
  | 'study'
  | 'writer'
  | 'translator'
  | 'image-tools'
  | 'coding'
  | 'files'
  | 'favorites'
  | 'history'
  | 'settings';

export interface ToolInputSpec {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
  longDescription: string;
  iconName: string;
  targetNavTab?: NavigationTab;
  samplePrompts: string[];
  features: string[];
  inputSpecs: ToolInputSpec[];
  defaultMockOutput: string;
  tags: string[];
  badgeText?: string;
}

export interface CategoryMeta {
  id: ToolCategory;
  label: string;
  description: string;
  iconName: string;
  accentColor: string;
  itemCount: number;
}

export type HistoryActionType = 'search' | 'launch_tool' | 'ask_query' | 'favorite_toggle' | 'preference_change';

export interface HistoryItem {
  id: string;
  action: HistoryActionType;
  toolId?: string;
  toolName: string;
  details: string;
  timestamp: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserSettings {
  theme: ThemeMode;
  language: string;
  cardDensity: 'comfortable' | 'compact';
  soundEffects: boolean;
  autoSaveHistory: boolean;
  showShortcutsHint: boolean;
}

export interface ToastNotification {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning';
}
