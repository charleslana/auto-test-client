import router from '@/router';
import ToastEnum from '@/enum/toastEnum';
import { getTokenFromLocalStorage } from './localStorageUtils';
import { toast } from 'bulma-toast';

export function numberFormat(number: number): string {
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
    type RouteLocationRaw = import('vue-router').RouteLocationRaw;
    const route: RouteLocationRaw = { name: 'panel-dashboard' };
    router.push(route);
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
