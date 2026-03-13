import TrueFalseQuestion from './TrueFalseQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import MatchPairsQuestion from './MatchPairsQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import ImageSingleChoiceQuestion from './ImageSingleChoiceQuestion'

export const QuestionRegistry: Record<string, any> = {
  true_false: TrueFalseQuestion,
  multiple_choice: MultipleChoiceQuestion,
  match_pairs: MatchPairsQuestion,
  single_choice: SingleChoiceQuestion,
  image_single_choice:ImageSingleChoiceQuestion
};
