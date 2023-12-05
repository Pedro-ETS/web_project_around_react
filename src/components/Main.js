import React, {  useState, useEffect } from "react";
import { getCardsApi } from "../utils/api.js";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Api from "../components/Api.js";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  ontrashCard,
  onCardClick,
  cardStatus,
  onClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarUrl = currentUser && currentUser.avatar;
  const userName = currentUser && currentUser.name;
  const userDescription = currentUser && currentUser.about;
  const [isHovered, setIsHovered] = useState(false);
  const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   userData.getUser()// Llama a la API para obtener los datos del usuario cuando el componente se monta
  //     .then((data) => {// Configura los datos en las variables de estado
  //       setUserName(data.name);
  //       setUserDescription(data.about);
  //       setUserAvatar(data.avatar);
  //     })

  //     .catch((error) => {
  //       alert.error("Error al obtener datos del usuario:", error);
  //     });
  // }, []); // aseguramos que se ejecute solo una vez al montar el componente
  useEffect(() => {
    getCardsApi
      .getInitialCards()
      .then((data) => {
        setCards(data);
        console.log(data);
      })
      .catch((error) => {
        alert("Error al obtener datos del usuario:", error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); 
    const api = new Api({
      address: "https://around.nomoreparties.co/v1/web_es_09/cards/likes/"+card._id,
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
      });
    api.changeLikeCardStatus(!isLiked)
    .then((newCard) => {
      console.log(newCard);
      console.log(card._id);
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  });
  }
  
  function handleCardDelete(card) {
    const deletCardApi = new Api({
      address: "https://around.nomoreparties.co/v1/web_es_09/cards/" +card._id,
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
    });
    deletCardApi.deleteCard()
    .then((data) => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));    
  });
  }

  return (
    <main className="container">
      <section className="profile">
        <div
          className="profile__content"
          style={{ backgroundImage: `url(${avatarUrl})` }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <div
            className={`profile__content-fond ${
              isHovered ? "profile__content-fond_opened" : ""
            }`}
          >
            <button
              className="profile__btn-edit"
              onClick={onEditAvatarClick}
            ></button>
          </div>
        </div>
        <div className="profile__info">
          <h2 className="profile__subtitle">{userName}</h2>
          <button
            onClick={onEditProfileClick}
            className="edit-button edit-button_action_add"
          ></button>
          <p id="profiletext" className="profile__text">
            {userDescription}
          </p>
        </div>
        <button onClick={onAddPlaceClick} className="add-button"></button>
      </section>
      <section className="elements">
        <div className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              id={card.id}
              likes={card.likes}
              link={card.link}
              name={card.name}
              ontrashCard={ontrashCard}
              owner={card.owner._id}
              onCardLike={handleCardLike}
              card={card}
              onCardDelete={handleCardDelete}
            />
          ))}
        </div>
        {cardStatus !== null ? (
          <ImagePopup selectedCard={cardStatus} onClose={onClose} />
        ) : null}
      </section>
    </main>
  );
}

export default Main;
