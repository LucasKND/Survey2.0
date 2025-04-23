import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useSurvey } from '../context/SurveyContext';
import { Check, BadgePercent, ShoppingCart, Timer, Gift, Star, Award, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const ResultCard: React.FC = () => {
  const { result, resetSurvey } = useSurvey();
  const [timeLeft, setTimeLeft] = useState(900);
  const [isOpen, setIsOpen] = useState(false);
  
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

  const bonusItems = [
    {
      icon: <Gift className="w-5 h-5 text-pink-500" />,
      title: "Bônus 1: Consultoria Estratégica",
      value: "R$ 497,00",
      description: "1 hora de consultoria individual para alinhar sua estratégia"
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: "Bônus 2: Templates Premium",
      value: "R$ 297,00",
      description: "Pack com 20 templates exclusivos para suas redes sociais"
    },
    {
      icon: <Package className="w-5 h-5 text-blue-500" />,
      title: "Bônus 3: Curso Express",
      value: "R$ 397,00",
      description: "Acesso ao mini-curso 'Autoridade Digital em 7 Dias'"
    }
  ];
  
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

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 space-y-4 border border-pink-100">
          <h3 className="text-xl font-bold flex items-center gap-2 text-pink-600">
            <Gift className="h-6 w-6" />
            Bônus Exclusivos (Valor Total: R$ 1.191,00)
          </h3>
          
          <div className="space-y-4">
            {bonusItems.map((bonus, index) => (
              <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="shrink-0">{bonus.icon}</div>
                <div className="ml-3 flex-1">
                  <h4 className="font-medium">{bonus.title}</h4>
                  <p className="text-sm text-muted-foreground">{bonus.description}</p>
                  <p className="text-sm font-medium text-green-600 mt-1">Valor: {bonus.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="bg-muted/50 rounded-lg p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium">Garantias Exclusivas</span>
            </div>
            <Button variant="ghost" size="sm">
              {isOpen ? "Ver menos" : "Ver mais"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="grid gap-4">
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-medium mb-2">✨ Garantia de 15 Dias</h4>
                <p className="text-sm text-muted-foreground">
                  Se em até 15 dias você não estiver satisfeito(a), devolvemos 100% do seu investimento, sem burocracia.
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-medium mb-2">🎯 Garantia de Resultado</h4>
                <p className="text-sm text-muted-foreground">
                  Se você seguir nossa metodologia e não tiver resultados em 30 dias, oferecemos mais 2 meses de suporte gratuito.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

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
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-green-800 mb-2">
              🎁 Oferta Especial + 3 Bônus
            </p>
            <p className="text-xl font-bold text-green-700">
              12x de R$ {(result.discountPrice / 12).toFixed(2)}
            </p>
            <p className="text-xs text-green-600 mt-1">
              ou R$ {result.discountPrice.toFixed(2)} à vista
            </p>
          </div>

          <Button
            size="lg"
            className="w-full py-6 text-lg font-bold bg-green-500 hover:bg-green-600 text-white"
          >
            <ShoppingCart className="mr-2" />
            Garantir Minha Vaga + Bônus Exclusivos
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              🔒 Pagamento 100% Seguro
              <Separator orientation="vertical" className="h-3" />
              ✨ Satisfação Garantida
              <Separator orientation="vertical" className="h-3" />
              🎯 Suporte VIP
            </p>
            <p className="text-[11px] text-muted-foreground/80">
              Processado por ambiente seguro • Criptografia SSL
            </p>
          </div>
          
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
