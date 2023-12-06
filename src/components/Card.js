import React, { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  id,
  likes,
  link,
  name,
  ontrashCard,
  owner,
  onCardLike,
  card,
  handleCardData,
  oncardImg,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && owner === currentUser._id;
  const isLiked = currentUser && likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `card__btn-trash ${isOwn ? "card__btn-trash_visible" : "card__btn-trash_hidden"}`;
  const cardLikeButtonClassName = `card__btn-love ${isLiked ? "card__btn-love_activate" : ""}`;
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    ontrashCard();
    handleCardData(card);
  }
  function handleImgCard() {
    oncardImg({ link: link });
  }
  return (
    <div id={id} className="card">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={link} className="card__image" alt="Imagen de un hermoso paisaje" onClick={handleImgCard}/>
      <h2 className="card__subtitle"> {name} </h2>
      <div className="card__contet">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <h3 className="card__like-number">{likes.length}</h3>
      </div>
    </div>
  );
}
export default Card;
