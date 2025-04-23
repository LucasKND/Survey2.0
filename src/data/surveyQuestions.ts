
import { SurveyQuestion } from '../types/survey';

export const questions: SurveyQuestion[] = [
  {
    id: 1,
    text: 'Qual o seu maior desafio atualmente?',
    type: 'multiple-choice',
    options: [
      { id: 'attract_clients', text: 'Atrair mais clientes online', icon: 'users' },
      { id: 'improve_social', text: 'Melhorar a presença nas redes sociais', icon: 'instagram' },
      { id: 'sell_instagram', text: 'Vender mais pelo Instagram', icon: 'shopping-bag' },
      { id: 'create_website', text: 'Criar um site profissional', icon: 'globe' },
      { id: 'visual_identity', text: 'Ter uma identidade visual forte', icon: 'palette' },
      { id: 'other', text: 'Outra', icon: 'plus-circle' }
    ]
  },
  {
    id: 2,
    text: 'Qual é o seu tipo de negócio?',
    type: 'multiple-choice',
    options: [
      { id: 'physical_store', text: 'Loja física' },
      { id: 'ecommerce', text: 'Loja online (e-commerce)' },
      { id: 'freelancer', text: 'Profissional autônomo' },
      { id: 'service_provider', text: 'Prestador de serviços' },
      { id: 'infoproducer', text: 'Infoprodutor/digital' },
      { id: 'startup', text: 'Startup ou empresa em crescimento' }
    ]
  },
  {
    id: 3,
    text: 'Você já investe em marketing atualmente?',
    type: 'multiple-choice',
    options: [
      { id: 'yes_no_return', text: 'Sim, mas não tenho retorno' },
      { id: 'yes_want_scale', text: 'Sim, e quero escalar' },
      { id: 'no_want_start', text: 'Não, quero começar do jeito certo' },
      { id: 'no_idea', text: 'Não sei por onde começar' }
    ]
  },
  {
    id: 4,
    text: 'Como você se comunica visualmente com o seu público?',
    type: 'multiple-choice',
    options: [
      { id: 'consolidated', text: 'Tenho uma identidade visual consolidada' },
      { id: 'confused', text: 'Tenho algo, mas está confuso' },
      { id: 'need_create', text: 'Preciso criar tudo do zero' },
      { id: 'no_attention', text: 'Não dou muita atenção a isso (ainda)' }
    ]
  },
  {
    id: 5,
    text: 'Qual seu objetivo nos próximos 3 meses?',
    type: 'multiple-choice',
    options: [
      { id: 'increase_revenue', text: 'Aumentar o faturamento' },
      { id: 'launch_product', text: 'Lançar um novo produto' },
      { id: 'professionalize_brand', text: 'Profissionalizar minha marca' },
      { id: 'grow_social', text: 'Crescer nas redes sociais' },
      { id: 'automate_marketing', text: 'Automatizar processos de marketing' }
    ]
  }
];
