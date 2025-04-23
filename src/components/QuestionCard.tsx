
import React, { useState, useEffect } from 'react';
import { SurveyQuestion, SurveyResponse } from '../types/survey';
import { useSurvey } from '../context/SurveyContext';
import { Button } from './ui/button';
import { CheckCircle, Circle } from 'lucide-react';
import { Input } from './ui/input';

interface QuestionCardProps {
  question: SurveyQuestion;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { responses, submitAnswer, nextQuestion, prevQuestion } = useSurvey();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  
  // Find existing response for this question
  useEffect(() => {
    const existingResponse = responses.find(r => r.questionId === question.id);
    if (existingResponse) {
      if (Array.isArray(existingResponse.answer)) {
        setSelectedOptions(existingResponse.answer);
        
        // Check if 'other' is selected to show text input
        if (existingResponse.answer.includes('other')) {
          setShowOtherInput(true);
        }
      } else if (typeof existingResponse.answer === 'string') {
        setTextInput(existingResponse.answer);
      }
    } else {
      setSelectedOptions([]);
      setTextInput('');
      setShowOtherInput(false);
    }
  }, [question.id, responses]);

  const handleOptionClick = (optionId: string) => {
    let newSelected;
    
    // If clicking on "Other" option, show the text input
    if (optionId === 'other') {
      setShowOtherInput(!showOtherInput);
    }
    
    // If option already selected, remove it, otherwise add it
    if (selectedOptions.includes(optionId)) {
      newSelected = selectedOptions.filter(id => id !== optionId);
    } else {
      newSelected = [...selectedOptions, optionId];
    }
    
    setSelectedOptions(newSelected);
    submitAnswer(question.id, newSelected);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    submitAnswer(question.id, e.target.value);
  };

  const isOptionSelected = (optionId: string) => {
    return selectedOptions.includes(optionId);
  };

  const hasAnswer = () => {
    if (question.type === 'multiple-choice') {
      return selectedOptions.length > 0;
    } else {
      return textInput.trim() !== '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">{question.text}</h2>
      
      {question.type === 'multiple-choice' && question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`option-card flex items-center ${isOptionSelected(option.id) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.id)}
            >
              <div className="mr-3">
                {isOptionSelected(option.id) ? (
                  <CheckCircle className="text-survey-dark h-5 w-5" />
                ) : (
                  <Circle className="text-muted-foreground h-5 w-5" />
                )}
              </div>
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      )}
      
      {showOtherInput && (
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Descreva seu desafio..."
            value={textInput}
            onChange={handleTextChange}
            className="w-full"
          />
        </div>
      )}
      
      {question.type === 'text' && (
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Sua resposta..."
            value={textInput}
            onChange={handleTextChange}
            className="w-full"
          />
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevQuestion}
          className="px-6"
          disabled={question.id === 1}
        >
          Anterior
        </Button>
        
        <Button
          onClick={nextQuestion}
          className="px-6 bg-survey-dark hover:bg-blue-500 text-white"
          disabled={!hasAnswer()}
        >
          {question.id === 5 ? 'Ver Resultado' : 'Próxima'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
