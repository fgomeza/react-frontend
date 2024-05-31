export type AuthUser = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  accessToken: string;
};

export const localStorageKeyForAuthToken = "userLogin";

export function saveUser(user: any) {
  if (user) {
    localStorage.setItem(localStorageKeyForAuthToken, JSON.stringify(user));
  }
}

export function getUser(): AuthUser {
  const item = localStorage.getItem(localStorageKeyForAuthToken);
  return item ? JSON.parse(item) : null;
}

export function logout() {
  localStorage.removeItem(localStorageKeyForAuthToken);
}

export function getUserId() {
  return getUser()?.id || "";
}

export function getUserName() {
  return getUser()?.name || "";
}

export function getUserEmail() {
  return getUser()?.email || "";
}

export function getIsUserVerified() {
  return getUser()?.verified || "";
}

export function getAccessToken() {
  return getUser()?.accessToken || "";
}
