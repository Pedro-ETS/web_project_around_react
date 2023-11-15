import React from "react";
function Card({ id, likes, link, name, onCardClick,ontrashCard}) {
  function handleClick() {
    onCardClick({ link, name });
  }
  return (
    <div id={id} className = "card">
      <button className="card__btn-trash" onClick={ontrashCard}></button>
      <img src = {link} className = "card__image" alt="Imagen de un hermoso paisaje" onClick={handleClick}/>
      <h2 className = "card__subtitle"> {name} </h2>
      <div className = "card__contet">    
        <button className = "card__btn-love"></button>
        <h3 className = "card__like-number">{likes}</h3>
      </div>
    </div>
  );
}
export default Card;
