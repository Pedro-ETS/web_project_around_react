import React, { useState, useEffect } from "react";
import { uownUser, getCardsApi } from "../utils/api";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
function Main({onEditProfileClick, onAddPlaceClick, onEditAvatarClick,ontrashCard ,onCardClick, cardStatus, onClose}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    uownUser.getUser()// Llama a la API para obtener los datos del usuario cuando el componente se monta
      .then((data) => {// Configura los datos en las variables de estado
        console.log(data);
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      
      .catch((error) => {
        alert.error("Error al obtener datos del usuario:", error);
      });
  }, []); // aseguramos que se ejecute solo una vez al montar el componente
  useEffect(() => {
    getCardsApi
      .getInitialCards()
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((error) => {
        alert.error("Error al obtener datos del usuario:", error);
      });
  }, []);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__content" style={{ backgroundImage: `url(${userAvatar})` }} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
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
            <Card key={card._id} likes={card.likes.length} link={card.link} name={card.name} onCardClick={onCardClick} ontrashCard={ontrashCard}/>
          ))}
        </div>
        {cardStatus!==null ? <ImagePopup selectedCard={cardStatus} onClose={onClose}/> : null}
      </section>
    </main>
  );
}

export default Main;
 