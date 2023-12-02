import React, { useState, useEffect} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import PopupWithForm from "./components/popupWithForm";
import Footer from "./components/Footer";
import { userData } from "./utils/api.js";
import  CurrentUserContext  from "./contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const[currentUser , setCurrentUser] = useState(null);

  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleEditAvatarPopupOpenClick = () => setEditAvatarPopupOpen(true);
  const handleConfirmationPopupOpenClick = () => setConfirmationPopupOpen(true);
  const handleCardClick = (cardData) => setSelectedCard(cardData);
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
  };
  useEffect(() => {
    userData.getUser()// Llama a la API para obtener los datos del usuario cuando el componente se monta
      .then((data) => {// Configura los datos en las variables de estado
        setCurrentUser(data);
      })
      
      .catch((error) => {
        alert.error("Error al obtener datos del usuario:", error);
      });
  }, []); // aseguramos que se ejecute solo una vez al montar el componente

  return (
    <> 
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarPopupOpenClick} ontrashCard={handleConfirmationPopupOpenClick} onCardClick={handleCardClick} cardStatus={selectedCard} onClose={closeAllPopups}/>
        <PopupWithForm title="Edit profile" name="popup" namebutton="Guardar" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} noValidate>
          <input name="name" id="popup-name" className="popup__input" placeholder="Nombre" minlength={2} maxlength={40} required/>
          <span className="popup__input-error popup-name-error"></span>
          <input name="about" id="popup-descripcion" className="popup__input" placeholder="Acerca de mi" minlength={2} maxlength={200} required/>
          <span className="popup__input-error popup-descripcion-error"></span>
        </PopupWithForm>
        <PopupWithForm title="New place" name="popup-add" namebutton="Guardar" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} noValidate>
          <input name="name" id="popup-add-name" className="popup-add__input" placeholder="Title" minlength={2} required/>
          <span className="popup-add__input-error popup-add-name-error"></span>
          <input name="link" type="url"
            id="popup-add-descripcion" className="popup-add__input" placeholder="Imagen URL" required/>
          <span className="popup-add__input-error popup-add-descripcion-error"></span>
        </PopupWithForm>
        <PopupWithForm title="Cambiar foto de perfil" name="popup-edit-img" namebutton="Guardar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} noValidate>
          <input name="link" type="url" id="popup-edit-img-descripcion" className="popup-edit-img__input" placeholder="URL" required/>
          <span className="popup-edit-img__input-error popup-edit-img-descripcion-error"></span>
        </PopupWithForm>
        <PopupWithForm title="¿Estás seguro?" name="popup-confirm-deletion" namebutton="si" isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} noValidate/>
        <Footer/>
        </CurrentUserContext.Provider>
        
      </div>
    </>
  );
}

export default App;
