export type AuthUser = {
  name: string,
  email: string,
  verified: boolean,
  jwt: string
}

export const localStorageKeyForAuthToken = "userLogin";

export function saveUser(user: any) {
  if (user) {
    localStorage.setItem(localStorageKeyForAuthToken, JSON.stringify(user));
  }
}

export function getUser() {
  const item = localStorage.getItem(localStorageKeyForAuthToken);
  return item ? JSON.parse(item) : null;
}

export function logout() {
  localStorage.removeItem(localStorageKeyForAuthToken);
}

export function getName() {
  return getUser()?.name || '';
}

export function getEmail() {
  return getUser()?.email || '';
}

export function getVerified() {
  return getUser()?.verified || '';
}

export function getJwt() {
  return getUser()?.jwt || '';
}