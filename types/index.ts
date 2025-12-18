// Core data types for Bible Steps

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  currentStreak: number;
  longestStreak: number;
  gracePeriodActive: boolean;
  sabbathModeEnabled: boolean;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  enabled: boolean;
  time: string; // HH:MM format for daily reminder
  graceBased: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // "22:00"
    end: string; // "08:00"
  };
  mentalHealthMode: boolean;
}

export interface UserProfile {
  displayName: string;
  email?: string;
  avatar?: string; // URL or icon name
  joinDate: string; // ISO date
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  defaultTranslation: BibleTranslation;
  readingTimeGoal: 5 | 10 | 15; // minutes
  sabbathMode: boolean;
  sabbathDay: 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sunday = 0
  autoAdvance: boolean;
  favoriteCategories: DevotionCategory[];
  hideCompleted: boolean;
  upcomingCount: 3 | 5 | 7;
}

export interface Devotion {
  id: string;
  title: string;
  date: Date; // Creation date
  scheduledDate?: Date; // When the devotion should appear
  readingTime: number; // minutes
  scripture: ScriptureReference;
  content: string;
  reflection: string;
  actionStep: string;
  category: DevotionCategory;
  tags: string[];
}

export type DevotionCategory =
  | "general"
  | "anxiety-peace"
  | "work-ethics"
  | "relationships"
  | "social-justice"
  | "rest-sabbath"
  | "identity"
  | "community"
  | "purpose"
  | "faith"
  | "prayer";

export interface ScriptureReference {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  translation: BibleTranslation;
  text: string;
}

export type BibleTranslation = "NIV" | "ESV" | "NLT" | "MSG" | "NRSV" | "KJV" | "NKJV" | "CSB";

export interface Step {
  id: string;
  userId: string;
  devotionId: string;
  completedAt: Date;
  actionTaken: boolean;
  actionNote?: string;
  reflectionNote?: string;
  moodBefore?: Mood;
  moodAfter?: Mood;
}

export type Mood = "anxious" | "peaceful" | "sad" | "joyful" | "tired" | "energized" | "stressed" | "calm";

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: Date;
  gracePeriodUsed: boolean;
  gracePeriodExpiresAt?: Date;
}

export interface Community {
  id: string;
  name: string;
  memberIds: string[];
  createdAt: Date;
  type: "accountability" | "study" | "prayer";
  isPrivate: boolean;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  userId: string;
  content: string;
  type: "reflection" | "prayer-request" | "victory" | "struggle";
  isAnonymous: boolean;
  createdAt: Date;
  reactions: Reaction[];
  replies: CommunityReply[];
}

export interface Reaction {
  userId: string;
  type: "pray" | "amen" | "encourage" | "relate";
  createdAt: Date;
}

export interface CommunityReply {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface SabbathSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  activities: SabbathActivity[];
  reflection?: string;
}

export type SabbathActivity =
  | "rest"
  | "nature-walk"
  | "creative"
  | "social"
  | "prayer"
  | "silence"
  | "reading";

export interface DecisionCoachQuery {
  id: string;
  userId: string;
  question: string;
  category: "career" | "relationships" | "ethics" | "purpose" | "conflict";
  context: string;
  scriptureMatches: ScriptureReference[];
  communityPerspectives: string[];
  createdAt: Date;
  resolved: boolean;
}

export interface BreathPrayer {
  id: string;
  title: string;
  inhalePhrase: string;
  exhalePhrase: string;
  duration: number; // seconds
  category: "anxiety" | "peace" | "gratitude" | "lament" | "trust";
  audioUrl?: string;
}
