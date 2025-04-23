
import { SurveyResponse, SurveyResult } from '../types/survey';

export function determineResults(responses: SurveyResponse[]): SurveyResult {
  // Get answers by their question ID for easier access
  const answerMap = responses.reduce((acc, curr) => {
    acc[curr.questionId] = curr.answer;
    return acc;
  }, {} as Record<number, string | string[]>);
  
  let service = '';
  let features: string[] = ['Atendimento personalizado', 'Execução estratégica', 'Suporte contínuo'];
  
  // Question 1 (Challenge) + Question 4 (Visual communication)
  const challenge = Array.isArray(answerMap[1]) ? answerMap[1][0] : '';
  const visualIdentity = Array.isArray(answerMap[4]) ? answerMap[4][0] : '';
  const goal = Array.isArray(answerMap[5]) ? answerMap[5][0] : '';
  
  // Basic logic for demonstration purposes
  if ((challenge === 'improve_social' || challenge === 'sell_instagram') && 
      (visualIdentity === 'need_create' || visualIdentity === 'no_attention')) {
    service = 'Combo de Gestão de Redes + Design e Branding';
    features = [...features, 'Estratégia completa para redes sociais', 'Criação de identidade visual profissional'];
  } else if (challenge === 'attract_clients' || challenge === 'sell_instagram') {
    service = 'Plano de Marketing Digital Completo';
    features = [...features, 'Estratégia de aquisição de clientes', 'Otimização de conversão'];
  } else if (challenge === 'create_website') {
    service = 'Desenvolvimento de Site Profissional';
    features = [...features, 'Design responsivo', 'Otimização para SEO'];
  } else if (challenge === 'visual_identity') {
    service = 'Pacote de Branding Completo';
    features = [...features, 'Design de logo', 'Guia de marca'];
  } else if (goal === 'automate_marketing') {
    service = 'Automação de Marketing e Vendas';
    features = [...features, 'Setup de ferramentas', 'Criação de fluxos automatizados'];
  } else {
    service = 'Consultoria Estratégica Personalizada';
    features = [...features, 'Diagnóstico completo do negócio', 'Plano de ação prático'];
  }
  
  // Base price and discount
  const basePrice = 1997;
  const discountPrice = 1057; // 47% off
  
  return {
    title: '🎉 Sua Estratégia Está Pronta!',
    description: 'Com base nas suas respostas, montamos a solução ideal para alavancar seus resultados!',
    service,
    features,
    price: basePrice,
    discountPrice
  };
}
