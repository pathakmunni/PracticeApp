export interface Slide {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: string | string[]
}

export interface Section {
  id: string
  title: string
  slides: Slide[]
}

export interface Unit {
  id: string
  title: string
  sections: Section[]
}
