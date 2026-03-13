export interface AppConfig {
  version: number;
  language: string;
  appId: string;
}

export interface Thumbnail {
  mediaId: string;
  url: string;
  altText: string;
}

export interface ParagraphContent {
  contentId: string;
  order: number;
  type: 'paragraph';
  text: string;
}

export interface ListContent {
  contentId: string;
  order: number;
  type: 'list';
  title?: string;
  items: string[];
}

export type SectionContent = ParagraphContent | ListContent;

export interface QuizOption {
  id: string;
  text: string;
}

export interface Question {
  questionId: string;
  order: number;
  type: 'multiple_choice';
  question: string;
  options: QuizOption[];
  correctOptions: string[];
}

export interface Section {
  sectionId: string;
  sectionType: 'content' | 'quiz';
  displayOrder: number;
  title: string;
  content?: SectionContent[];
  questions?: Question[];
}

export interface Unit {
  id: string;
  unitId: string;
  title: string;
  displayOrder: number;
  thumbnail: Thumbnail;
  sections: Section[];
}

export interface AppContent {
  appName: string;
  appConfig: AppConfig;
  units: Unit[];
}