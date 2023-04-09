import { LoginType } from "../components/Login/types";
import { RegisterType } from "../components/Register/types";

export const BASE_URL = 'https://auth.nomoreparties.co';

type UserDataType = {
  email: string;
  _id: string;
}

const handleResponse: (result: Response) => Promise<any> = (result) => {
  if (result.ok) {
    return result.json();
  }

  return Promise.reject(result);
};

export const register: (data: RegisterType) => Promise<{data: UserDataType}> = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
};

export const login: (data: LoginType) => Promise<{token: string}> = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
};

export const checkToken: (jwt: string) => Promise<{data: UserDataType}> = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  }).then(handleResponse);
};
