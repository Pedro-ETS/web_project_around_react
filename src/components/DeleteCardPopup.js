import React from 'react';
import PopupWithForm from './popupWithForm';
function DeleteCardPopup(props) {

    function handleSubmit(e){
        e.preventDefault();
      
      }

    return (
        <div>
         <PopupWithForm
            title="¿Estás seguro?"
            name="popup-confirm-deletion"
            namebutton="si"
            isOpen={props.isConfirmationPopupOpen}
            onClose={props.closeAllPopups}
            onSubmit={handleSubmit}
            noValidate
          />
        </div>
    );
}

export default DeleteCardPopup;