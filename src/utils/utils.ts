import ToastEnum from '@/enum/toastEnum';
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
  if (error.response) {
    return showToast(error.response.data.message, ToastEnum.Danger);
  }
  showToast(error.message, ToastEnum.Danger);
}
