import React, {  useState, useEffect } from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Api from "../components/Api.js";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  ontrashCard,                 
  cardStatus,
  onClose,
  cards,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarUrl = currentUser && currentUser.avatar;
  const userName = currentUser && currentUser.name;
  const userDescription = currentUser && currentUser.about;
  const [isHovered, setIsHovered] = useState(false);
 

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
              onCardLike={onCardLike}
              card={card}
              onCardDelete={onCardDelete}
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
