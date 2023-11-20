import Api from '../components/Api'; // Asegúrate de proporcionar la ruta correcta a la clase Api

export const uownUser = new Api({
  address: 'https://around.nomoreparties.co/v1/web_es_09/users/me',
  token: `33adefcc-a71e-4103-8764-faa4d26a6099`, // Cambia esto con tu token
});


export const getCardsApi = new Api({
  address: "https://around.nomoreparties.co/v1/web_es_09/cards",
  token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
});



