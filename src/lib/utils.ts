import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Limita a taxa de execução de uma função
 * @param func A função a ser throttled
 * @param wait O tempo de espera em milissegundos
 * @returns Função throttled
 */
export function throttle<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeout: number | undefined;
  
  return function(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= wait) {
      lastCall = now;
      return func.apply(this, args);
    } else {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, wait - timeSinceLastCall);
    }
  };
}
