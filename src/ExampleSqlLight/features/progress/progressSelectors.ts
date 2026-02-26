import { RootState } from '../../app/store'

export const getUnitProgress = (
  state: RootState,
  unit: any
) => {
  const progress = state.progress

  let totalSlides = 0
  let completedSlides = 0

  unit.sections?.forEach((section: any) => {
    section.slides?.forEach((slide: any) => {
      totalSlides++

      if (
        progress[unit.id]?.[section.id]?.[slide.id]?.completed
      ) {
        completedSlides++
      }
    })
  })

  if (totalSlides === 0) return 0

  return Math.floor((completedSlides / totalSlides) * 100)
}
