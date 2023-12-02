import React, { useState, useEffect } from "react";
import {getCardsApi } from "../utils/api.js";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({onEditProfileClick, onAddPlaceClick, onEditAvatarClick,ontrashCard ,onCardClick, cardStatus, onClose}) {
  const user = React.useContext(CurrentUserContext);
  const avatarUrl = user && user.avatar;
  const userName = user && user.name;
  const userDescription = user && user.description;

 
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
        alert.error("Error al obtener datos del usuario:", error);
      });
  }, []);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__content" style={{ backgroundImage: `url(${avatarUrl})` }} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
          <div
            className={`profile__content-fond ${ isHovered ? "profile__content-fond_opened" : ""}`}>
            <button className="profile__btn-edit"onClick={onEditAvatarClick}></button>
          </div>
        </div>
        <div className="profile__info">
          <h2 className="profile__subtitle">{userName}</h2>
          <button onClick={onEditProfileClick} className="edit-button edit-button_action_add"></button>
          <p id="profiletext" className="profile__text">
            {userDescription}
          </p>
        </div>
        <button onClick={onAddPlaceClick} className="add-button"></button>
      </section>
      <section className="elements">
        <div className="cards">
          {cards.map((card) => (
            <Card key={card._id} id={card.id}likes={card.likes} link={card.link} name={card.name} onCardClick={onCardClick} ontrashCard={ontrashCard} owner={card.owner._id}/>
          ))}
        </div>
        {cardStatus!==null ? <ImagePopup selectedCard={cardStatus} onClose={onClose}/> : null}
      </section>
    </main>
  );
}

export default Main;
 