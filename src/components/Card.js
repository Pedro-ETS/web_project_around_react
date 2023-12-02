import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({id, likes, link, name, onCardClick, ontrashCard, owner}) {
  const currentUser = React.useContext(CurrentUserContext);
const isOwn = currentUser && owner === currentUser._id;

const isLiked =  currentUser &&  likes.some(i => i._id === currentUser._id);
  
// Creando una variable que después establecerás en `className` para el botón eliminar
const cardDeleteButtonClassName = (
  `card__btn-trash ${isOwn ? 'card__btn-trash_visible' : 'card__btn-trash_hidden'}`
); 
// Crea una variable que después establecerás en `className` para el botón like
const cardLikeButtonClassName = (`card__btn-love ${isLiked ? 'card__btn-love_activate' : ''}`); 

  function handleClick() {
    onCardClick({ link, name });
  }
  return (
    <div id={id} className = "card">
      <button className={cardDeleteButtonClassName} onClick={ontrashCard}></button>
      <img src = {link} className = "card__image" alt="Imagen de un hermoso paisaje" onClick={handleClick}/>
      <h2 className = "card__subtitle"> {name} </h2>
      <div className = "card__contet">    
        <button className = {cardLikeButtonClassName}></button>
        <h3 className = "card__like-number">{likes.length}</h3>
      </div>
    </div>
  );
}
export default Card;
