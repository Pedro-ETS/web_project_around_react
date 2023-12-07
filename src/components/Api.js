export default class Api {
  constructor({ address, token, datos }) {
    this._url = address;
    this._authorization = token;
    this._datos = datos;
  }
  getInitialCards(fullLink) {
    return fetch(this._url+fullLink, {
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
  setCard(fullLink,formData) {
    return fetch(this._url+fullLink, {
      method: "POST",
      body: JSON.stringify({
        link: formData.link,
        name: formData.name,
      }),
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
  getUser(fullLink) {
    return fetch(this._url+fullLink, {
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
  changeLikeCardStatus(isLiKed,fullLink,cardId) {
    if (isLiKed) {
      return fetch(this._url+fullLink+cardId, {
        method: "PUT",
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
    } else {
      return fetch(this._url+fullLink+cardId, {
        method: "DELETE",
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
  deleteCard(fullLink,cardId) {
    return fetch(this._url+fullLink+cardId, {
      method: "DELETE",
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
  setUserInfo(fullLink,datos) {
    return fetch(this._url+fullLink, {
      method: "PATCH",
      body: JSON.stringify({
        about: datos.about,
        name: datos.name,
      }),
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
  modifyImgUser(fullLink,datos) {
    return fetch(this._url+fullLink, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: datos.avatar,
      }),
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
