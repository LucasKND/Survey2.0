
import React from 'react';
import { SurveyProvider } from '../context/SurveyContext';
import SurveyContainer from '../components/SurveyContainer';
import { Rocket } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-white p-3 rounded-full shadow-md mb-6">
            <Rocket className="text-survey-dark h-8 w-8" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            🚀 Encontre a Estratégia Perfeita para o Sucesso do Seu Negócio
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Responda 5 perguntas rápidas e receba uma solução personalizada com DESCONTO exclusivo! 👇
          </p>
        </header>
        
        <SurveyProvider>
          <SurveyContainer />
        </SurveyProvider>
        
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>© 2025 Success Blueprint. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
