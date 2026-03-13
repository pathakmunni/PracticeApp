export interface Media {
  mediaId: string
  url: string
  altText?: string
}

export interface ParagraphContent {
  contentId: string
  order: number
  type: 'paragraph'
  text: string
  thumbnail?: Media
}

export interface ListContent {
  contentId: string
  order: number
  type: 'list'
  title: string
  items: string[]
  thumbnail?: Media
}

export type SectionContent =
  | ParagraphContent
  | ListContent

export interface Dot {
  dotId: string
  order: number
  title: string
  text: string
  position: {
    x: number
    y: number
  }
}

export interface Section {
  sectionId: string
  title: string
  sectionType: string
  displayOrder: number
  content: SectionContent[]
  interactiveDots?: Dot[]
}

export interface Unit {
  id: string
  title: string
  unitId: string
  sections: Section[]
  thumbnail: Media
}