
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useSurvey } from '../context/SurveyContext';
import { Check, BadgePercent, ShoppingCart, Timer } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

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
    <Card className="w-full max-w-2xl mx-auto transition-all duration-300">
      <CardHeader className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">{result.title}</h2>
        <Badge variant="secondary" className="text-lg px-4 py-2 mx-auto">
          <BadgePercent className="w-5 h-5 mr-2" />
          47% de Desconto Exclusivo
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-lg text-center text-muted-foreground">
          {result.description}
          <p className="mt-2 font-medium">Aproveite esta oportunidade única de transformar seu negócio!</p>
        </div>
        
        <div className="bg-primary/5 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
            <ShoppingCart className="h-6 w-6" />
            {result.service}
          </h3>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            {result.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-secondary/10 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Oferta por Tempo Limitado
          </h3>
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Investimento Normal:</p>
              <p className="text-xl line-through opacity-75">R$ {result.price.toFixed(2)}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">Hoje Apenas:</p>
              <p className="text-3xl font-bold text-green-600">R$ {result.discountPrice.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-center">Esta oferta expira em:</p>
            <div className="w-full bg-secondary/20 rounded-full h-2 overflow-hidden">
              <div className="countdown-bar" />
            </div>
            <p className="text-center font-mono font-bold text-lg">{formatTime(timeLeft)}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full py-6 text-lg font-bold bg-green-500 hover:bg-green-600 text-white"
          >
            <ShoppingCart className="mr-2" />
            Garantir Minha Vaga com 47% OFF
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            🔒 Pagamento 100% Seguro  •  ✨ Satisfação Garantida  •  🎯 Suporte Personalizado
          </p>
          
          <Button
            variant="ghost"
            onClick={resetSurvey}
            className="w-full"
          >
            Refazer o Questionário
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
