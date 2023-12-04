import React, { useState, useEffect} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import PopupWithForm from "./components/popupWithForm";
import Footer from "./components/Footer";
import { userData } from "./utils/api.js";
import EditProfilePopup from "./components/EditProfilePopup.js";
import  CurrentUserContext  from "./contexts/CurrentUserContext.js";
import Api from "./components/Api.js";

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

  function handleUpdateUser(datos){
    console.log(datos);
    const editUserApi = new Api({
      address: "https://around.nomoreparties.co/v1/web_es_09/users/me",
      token: `33adefcc-a71e-4103-8764-faa4d26a6099`,
      datos: {
        about: datos.about,
        name: datos.name,
      },
    });
    editUserApi.setUserInfo()
    .then((data) => {// Configura los datos en las variables de estado
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((error) => {
      alert("Error al modificar los  datos del usuario:", error);
    });
  }

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
        <Main onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarPopupOpenClick} ontrashCard={handleConfirmationPopupOpenClick} onCardClick={handleCardClick} cardStatus={selectedCard} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
        
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
