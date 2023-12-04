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
 changeLikeCardStatus(isLiKed){
    if(isLiKed){
      return fetch(this._url, {
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
    }else{
      return fetch(this._url, {
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
  deleteCard() {
    return fetch(this._url, {
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
  setUserInfo() {
    return fetch(this._url, {
      method: "PATCH",
      body: JSON.stringify({
        about: this._datos.about,
        name: this._datos.name,
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
 //generame una funcion que haga la peticion para actualizar like
  
}
