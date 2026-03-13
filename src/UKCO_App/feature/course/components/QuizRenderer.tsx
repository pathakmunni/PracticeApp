import TrueFalseQuestion from "./questionTypes/TrueFalseQuestion"
import SingleChoiceQuestion from "./questionTypes/SingleChoiceQuestion"
import MultipleChoiceQuestion from "./questionTypes/MultipleChoiceQuestion"
// import ImageSingleChoiceQuestion from "./questionTypes/ImageSingleChoiceQuestion"
import MatchPairsQuestion from "./questionTypes/MatchPairsQuestion"

export default function QuizRenderer({ question }) {

  switch (question.type) {

    case "true_false":
      return <TrueFalseQuestion question={question} />

    case "single_choice":
      return <SingleChoiceQuestion question={question} />

    // case "image_single_choice":
    //   return <ImageSingleChoiceQuestion question={question} />

    case "multiple_choice":
      return <MultipleChoiceQuestion question={question} />

    case "match_pairs":
      return <MatchPairsQuestion question={question} />

    default:
      return null
  }
}