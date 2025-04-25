import React, { useEffect } from 'react';
import { useSurvey } from '../context/SurveyContext';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import ProgressBar from './ProgressBar';
import { trackScroll } from '../lib/firebase';
import { throttle } from '../lib/utils';

const SurveyContainer: React.FC = () => {
  const { currentQuestion, questions, progress, isComplete } = useSurvey();
  
  // Adicionar rastreamento de rolagem
  useEffect(() => {
    // Função para calcular a porcentagem de rolagem
    const calculateScrollPercentage = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Cálculo da porcentagem de rolagem
      const scrollPercentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      
      return scrollPercentage;
    };
    
    // Função throttled para não sobrecarregar o Firebase com muitos eventos
    const handleScroll = throttle(() => {
      const scrollPercentage = calculateScrollPercentage();
      // Só registra quando a porcentagem muda significativamente (a cada 25%)
      if (scrollPercentage % 25 === 0 && scrollPercentage > 0) {
        trackScroll(scrollPercentage, {
          questionId: isComplete ? 'resultado' : questions[currentQuestion].id,
          page: isComplete ? 'resultado' : `pergunta-${questions[currentQuestion].id}`
        });
      }
    }, 1000); // Limita a 1 evento por segundo
    
    // Adicionar o listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Remover o listener quando o componente desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentQuestion, questions, isComplete]);
  
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
