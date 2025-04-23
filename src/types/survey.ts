
export type SurveyQuestion = {
  id: number;
  text: string;
  type: 'multiple-choice' | 'text';
  options?: SurveyOption[];
};

export type SurveyOption = {
  id: string;
  text: string;
  icon?: string;
};

export type SurveyResponse = {
  questionId: number;
  answer: string | string[];
};

export type SurveyResult = {
  title: string;
  description: string;
  service: string;
  features: string[];
  price: number;
  discountPrice: number;
};
