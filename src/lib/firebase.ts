import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Substitua com suas credenciais do Firebase
// Você obterá estas informações ao criar um projeto no Firebase Console (https://console.firebase.google.com/)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SEU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Gerar ID de sessão único para o usuário atual
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  
  return sessionId;
};

// Função para rastrear eventos de usuário
export const trackEvent = async (eventType: string, elementId: string, details: Record<string, any> = {}) => {
  try {
    const sessionId = getSessionId();
    
    await addDoc(collection(db, "user_interactions"), {
      eventType,
      elementId,
      details,
      sessionId,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Erro ao rastrear evento:", error);
    // Silenciar erros em produção para não afetar a experiência do usuário
  }
};

// Funções específicas para os diferentes tipos de eventos
export const trackClick = (elementId: string, details: Record<string, any> = {}) => {
  trackEvent('click', elementId, details);
};

export const trackScroll = (percentage: number, details: Record<string, any> = {}) => {
  trackEvent('scroll', 'page', { percentage, ...details });
};

export const trackViewTime = (pageId: string, timeMs: number) => {
  trackEvent('view_time', pageId, { durationMs: timeMs });
};

// Função para iniciar rastreamento de tempo de visualização
export const useViewTimeTracking = (pageId: string) => {
  const startTime = Date.now();
  
  return () => {
    const viewTime = Date.now() - startTime;
    trackViewTime(pageId, viewTime);
  };
};