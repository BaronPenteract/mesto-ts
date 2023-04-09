import { CardType } from "../components/Card/types";
import { AvatarType } from "../components/EditAvatarPopup/types";
import { UserType } from "../contexts/UserType";

interface Api {
  _baseUrl: string;
  _token: string;
  _headers: {
    authorization: string;
    'Content-Type': string;
  }
}

type ApiPropsType = {
  baseUrl: string;
  headers: {
    authorization: string;
    'Content-Type': string;
  }
}

class Api {
  constructor(options: ApiPropsType) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = this._headers.authorization;
  }

  async getInitialCards(): Promise<CardType[]> {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  addCard({ name, link }: CardType): Promise<CardType> {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId: string) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    });
  }

  likeCard(cardId: string): Promise<(result: Response) => Promise<Response>> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  unLikeCard(cardId: string): Promise<(result: Response) => Promise<Response>> {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId: string, isLiked: boolean) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  getUser(): Promise<UserType> {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  setUser({ name, about }: UserType): Promise<UserType> {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleResponse);
  }

  setAvatar(avatarData: AvatarType): Promise<UserType> {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatarData),
    }).then(this._handleResponse);
  }

  handleError(err: Error) {
    console.log(err);
  }

  async _handleResponse(result: Response): Promise<any> {
    const data = await result.json();
    return data;
  }
}

export default new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'cb4b8bf9-d1cf-4125-b87a-d2721614cb5f',
    'Content-Type': 'application/json',
  },
});
