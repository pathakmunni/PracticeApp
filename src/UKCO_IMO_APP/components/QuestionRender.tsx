import React from 'react';

import TrueFalseQuestion from './questionTypes/TrueFalseQuestion';
import SingleChoiceQuestion from './questionTypes/SingleChoiceQuestion';
import MultipleChoiceQuestion from './questionTypes/MultipleChoiceQuestion';

interface Props {
  question: any;
}

export default function QuestionRenderer({ question }: Props) {
  switch (question.type) {
    case 'true_false':
      return <TrueFalseQuestion question={question} />;

    case 'single_choice':
      return <SingleChoiceQuestion question={question} />;

    case 'multiple_choice':
      return <MultipleChoiceQuestion question={question} />;

    default:
      return null;
  }
}