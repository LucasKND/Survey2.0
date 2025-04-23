
import React from 'react';
import { useSurvey } from '../context/SurveyContext';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import ProgressBar from './ProgressBar';

const SurveyContainer: React.FC = () => {
  const { currentQuestion, questions, progress, isComplete } = useSurvey();
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-6">
      {!isComplete ? (
        <>
          <div className="w-full mb-2">
            <p className="text-sm text-muted-foreground text-right">
              Pergunta {currentQuestion + 1} de {questions.length}
            </p>
          </div>
          <ProgressBar progress={progress} />
          <QuestionCard question={questions[currentQuestion]} />
        </>
      ) : (
        <ResultCard />
      )}
    </div>
  );
};

export default SurveyContainer;
