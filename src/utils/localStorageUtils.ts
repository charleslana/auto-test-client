const TOKEN_KEY = 'token';

export function saveTokenToLocalStorage(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeTokenFromLocalStorage(): void {
  localStorage.removeItem(TOKEN_KEY);
}
