import Api from '../components/Api.js'; 

export const userData = new Api({
  address: 'https://around.nomoreparties.co/v1/web_es_09/users/me',
  token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
});


export const getCardsApi = new Api({
  address: "https://around.nomoreparties.co/v1/web_es_09/cards",
  token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
});


// const changeLikeCardStatus = new Api({
//   address: "https://around.nomoreparties.co/v1/web_es_09/cards/likes/",
//   token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
// });




