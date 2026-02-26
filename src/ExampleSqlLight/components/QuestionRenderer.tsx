import React from 'react'
import TrueFalseQuestion from './questions/TrueFalseQuestion'
import SingleChoiceQuestion from './questions/SingleChoiceQuestion'
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion'
import FreeTextQuestion from './questions/FreeTextQuestion'

const QuestionRenderer = ({ slide }: any) => {
  switch (slide.type) {
    case 'true_false':
      return <TrueFalseQuestion slide={slide} />

    case 'single_choice':
      return <SingleChoiceQuestion slide={slide} />

    case 'multiple_choice':
      return <MultipleChoiceQuestion slide={slide} />

    case 'free_text':
      return <FreeTextQuestion slide={slide} />

    default:
      return null
  }
}

export default QuestionRenderer
