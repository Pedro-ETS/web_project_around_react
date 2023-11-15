export default class Api {
  constructor({ address, token, datos }) {
    this._url = address;
    this._authorization = token; //obtengo el
    this._datos = datos;
  }
  getInitialCards() {
    return fetch(this._url, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  getUser() {
    return fetch(this._url, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
