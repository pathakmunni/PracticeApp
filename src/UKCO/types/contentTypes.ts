export type QuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'true_false'
  | 'free_text'
  | 'content';

export interface Slide {
  slideId: string;
  type: 'content' | 'quiz';
  questionType?: QuestionType;
  question?: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswer?: boolean;
  text?: string;
  list?: string[];
  image?: string;
}

export interface Section {
  sectionId: string;
  title: string;
  slides: Slide[];
}

export interface Unit {
  unitId: string;
  title: string;
  sections: Section[];
}

export interface AppContent {
  units: Unit[];
}