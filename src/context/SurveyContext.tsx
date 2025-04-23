
import React, { createContext, useContext, useState } from 'react';
import { SurveyQuestion, SurveyResponse, SurveyResult } from '../types/survey';
import { questions } from '../data/surveyQuestions';
import { determineResults } from '../utils/surveyLogic';

type SurveyContextType = {
  currentQuestion: number;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  result: SurveyResult | null;
  progress: number;
  isComplete: boolean;
  submitAnswer: (questionId: number, answer: string | string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetSurvey: () => void;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [result, setResult] = useState<SurveyResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Calculate progress percentage
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const submitAnswer = (questionId: number, answer: string | string[]) => {
    const existingResponseIndex = responses.findIndex(r => r.questionId === questionId);
    
    if (existingResponseIndex >= 0) {
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = { questionId, answer };
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, { questionId, answer }]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // This is the last question, calculate result
      const surveyResult = determineResults(responses);
      setResult(surveyResult);
      setIsComplete(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetSurvey = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setResult(null);
    setIsComplete(false);
  };

  return (
    <SurveyContext.Provider
      value={{
        currentQuestion,
        questions,
        responses,
        result,
        progress,
        isComplete,
        submitAnswer,
        nextQuestion,
        prevQuestion,
        resetSurvey
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
