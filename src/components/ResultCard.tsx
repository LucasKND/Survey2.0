
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useSurvey } from '../context/SurveyContext';
import { Check } from 'lucide-react';

const ResultCard: React.FC = () => {
  const { result, resetSurvey } = useSurvey();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  
  useEffect(() => {
    if (!timeLeft) return;
    
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!result) return null;
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{result.title}</h2>
      <div className="bg-survey inline-block px-3 py-1 rounded-full text-survey-dark font-semibold mb-6">
        Com 47% de Desconto Exclusivo 🤑
      </div>
      
      <p className="text-lg mb-6">{result.description}</p>
      
      <div className="bg-survey-light rounded-lg p-4 mb-6">
        <h3 className="text-xl font-bold text-survey-dark mb-3">👉 {result.service}</h3>
        
        <div className="space-y-2 mb-4">
          {result.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-survey-dark text-white rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">🔥 Oferta Relâmpago:</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm mr-2">Normalmente:</p>
            <p className="text-lg line-through opacity-75">R$ {result.price.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-sm">Hoje:</p>
            <p className="text-2xl font-bold">R$ {result.discountPrice.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm mb-1">Oferta expira em:</p>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="countdown-bar" />
          </div>
          <p className="text-center mt-1 font-mono">{formatTime(timeLeft)}</p>
        </div>
      </div>
      
      <Button
        className="w-full py-6 text-lg font-bold bg-green-500 hover:bg-green-600 text-white mb-4"
      >
        Quero Essa Solução com Desconto
      </Button>
      
      <Button
        variant="ghost"
        onClick={resetSurvey}
        className="w-full"
      >
        Refazer o Questionário
      </Button>
    </div>
  );
};

export default ResultCard;
