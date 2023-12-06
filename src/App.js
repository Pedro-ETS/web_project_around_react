import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { userData, getCardsApi } from "./utils/api.js";
import EditProfilePopup from "./components/EditProfilePopup.js";
import EditAvatarPopup from "./components/EditAvatarPopup.js";
import AddPlacePopup from "./components/AddPlacePopup.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import Api from "./components/Api.js";
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [card, setCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleEditAvatarPopupOpenClick = () => setEditAvatarPopupOpen(true);
  const handleConfirmationPopupOpenClick = () => setConfirmationPopupOpen(true);
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
  };
  function handleUpdateUser(datos) {
    console.log(datos);
    const editUserApi = new Api({
      address: "https://around.nomoreparties.co/v1/web_es_09/users/me",
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
      datos: {
        about: datos.about,
        name: datos.name,
      },
    });
    editUserApi
      .setUserInfo()
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        alert("Error al modificar los  datos del usuario:", error);
      });
  }
  useEffect(() => {
    userData
      .getUser() 
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        alert.error("Error al obtener datos del usuario:", error);
      });
  }, []); 

  useEffect(() => {
    getCardsApi
      .getInitialCards()
      .then((data) => {
        setCards(data);
        console.log(data);
      })
      .catch((error) => {
        alert("Error al obtener las tarjetas:", error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const api = new Api({
      address:
        "https://around.nomoreparties.co/v1/web_es_09/cards/likes/" + card._id,
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
    });
    api.changeLikeCardStatus(!isLiked).then((newCard) => {
      console.log(newCard);
      console.log(card._id);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleUpdateAvatar(data) {
    const editImgUser = new Api({
      address: "https://around.nomoreparties.co/v1/web_es_09/users/me/avatar",
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
      datos: {
        avatar: data.avatar,
      },
    });
    editImgUser
      .modifyImgUser()
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        alert("Error al modificar los  datos del usuario:", error);
      });
  }
  function handleAddPlaceSubmit(formData) {
    const apiInsertCard = new Api({
      address: "https://around.nomoreparties.co/v1/web_es_09/cards",
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
      datos: {
        link: formData.link,
        name: formData.name,
      },
    });
    apiInsertCard
      .setCard()
      .then((res) => {
        setCards((cards) => [res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        alert("Error al agregar una nueva tarjeta:", error);
      });
  }

  function handleCardData(card) {
    setCard(card);
  }

  function handleCardDelete() {
    const deletCardApi = new Api({
      address: "https://around.nomoreparties.co/v1/web_es_09/cards/" + card._id,
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
    });
    deletCardApi.deleteCard().then((data) => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    });
  }
  function handleImgCardBig(link) {
    setSelectedCard(link);
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarPopupOpenClick}
            ontrashCard={handleConfirmationPopupOpenClick}
            cardStatus={selectedCard}
            oncardImg={handleImgCardBig}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            cards={cards}
            onCardLike={handleCardLike}
            statuspopupConfirmation={isConfirmationPopupOpen}
            handleCardData={handleCardData}
            handleCardDelete={handleCardDelete}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
