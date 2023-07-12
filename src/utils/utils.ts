import MenuComponentEnum from '@/enum/MenuComponentEnum';
import router from '@/router';
import ToastEnum from '@/enum/ToastEnum';
import { getTokenFromLocalStorage } from './localStorageUtils';
import { toast } from 'bulma-toast';

export function formatCompactNumber(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
  return formatter.format(number);
}

export function showToast(message: string, type: ToastEnum): void {
  toast({
    message: message,
    type: type,
    dismissible: true,
    duration: 3000,
    single: true,
    pauseOnHover: true,
    animate: { in: 'fadeIn', out: 'fadeOut' }
  });
}

export function handlerError(error: any): void {
  if (error.code == 'ERR_NETWORK') {
    return showToast('Falha ao conectar com o servidor.', ToastEnum.Danger);
  }
  if (error.response && error.response.data.validation) {
    if (error.response && error.response.data.validation.params) {
      return showToast(error.response.data.validation.params.message, ToastEnum.Danger);
    }
    if (error.response && error.response.data.validation.query) {
      return showToast(error.response.data.validation.query.message, ToastEnum.Danger);
    }
    return showToast(error.response.data.validation.body.message, ToastEnum.Danger);
  }
  if (error.response && error.response.data.message) {
    return showToast(error.response.data.message, ToastEnum.Danger);
  }
  showToast(error.message, ToastEnum.Danger);
}

export function redirectToDashboardPage(): void {
  const getToken = getTokenFromLocalStorage();
  if (getToken != null) {
    router.push({ name: 'panel-dashboard' });
  }
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const formattedDate: string = new Date(date).toLocaleString('pt-BR', options);
  return formattedDate.replace(',', ' às');
}

export const addOverflowHidden = () => {
  document.documentElement.style.overflow = 'hidden';
};

export const removeOverflowHidden = () => {
  document.documentElement.style.overflow = '';
};

export const formatBreakLines = (text: string): string => {
  return text.replace(/\n/g, '<br>');
};

export function getMenuComponentTitle(type: string): string {
  let key = '';
  if (type === 'sqlQueryBuilder' || type === 'apiTest') {
    key = type.charAt(0).toUpperCase() + type.slice(1, 3).toUpperCase() + type.slice(3);
  } else {
    key = type.charAt(0).toUpperCase() + type.slice(1);
  }
  const enumValue = MenuComponentEnum[key as keyof typeof MenuComponentEnum];
  if (enumValue) {
    return enumValue;
  }
  throw new Error(`Invalid MenuComponentEnum value: ${type}`);
}

export const formatTextDate = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));
  const year = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
  const day = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date);
  const hour = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit' }).format(date);
  const minute = new Intl.DateTimeFormat('pt-BR', { minute: '2-digit' }).format(date);
  return `${day} de ${month} de ${year} às ${hour}:${minute}`;
};

export const formatNumber = (number: number): string => {
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export function calculateExperiencePercentage(
  minExperience: number,
  maxExperience: number
): number {
  const percentage = (minExperience / maxExperience) * 100;
  return Math.min(percentage, 100);
}

export const getRemainingTime = (targetDate: Date): string => {
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  if (timeDifference > 86400000) {
    const daysRemaining = Math.floor(timeDifference / 86400000);
    return `Faltam ${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'} restante${
      daysRemaining === 1 ? '' : 's'
    }`;
  }
  if (timeDifference > 3600000) {
    const hoursRemaining = Math.floor(timeDifference / 3600000);
    return `Faltam ${hoursRemaining} ${hoursRemaining === 1 ? 'hora' : 'horas'} restante${
      hoursRemaining === 1 ? '' : 's'
    }`;
  }
  const minutesRemaining = Math.floor(timeDifference / 60000);
  return `Faltam ${minutesRemaining} ${minutesRemaining === 1 ? 'minuto' : 'minutos'} restante${
    minutesRemaining === 1 ? '' : 's'
  }`;
};

export const calculateElapsedTime = (startDate: Date): string => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - startDate.getTime();
  if (timeDifference < 60000) {
    return 'Agora mesmo';
  }
  if (timeDifference < 3600000) {
    const minutesElapsed = Math.floor(timeDifference / 60000);
    return `${minutesElapsed} ${minutesElapsed === 1 ? 'minuto' : 'minutos'} atrás`;
  }
  if (timeDifference < 86400000) {
    const hoursElapsed = Math.floor(timeDifference / 3600000);
    return `${hoursElapsed} ${hoursElapsed === 1 ? 'hora' : 'horas'} atrás`;
  }
  const daysElapsed = Math.floor(timeDifference / 86400000);
  return `${daysElapsed} ${daysElapsed === 1 ? 'dia' : 'dias'} atrás`;
};
