import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    this._popup = popup;
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const nameInput = document.querySelector(".popup__input_name");
    const descriptionInput = document.querySelector(".popup__input_description");
    const profileTitle = document.querySelector(".profile__title");
    const profileSubTitle = document.querySelector(".profile__subtitle");
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileSubTitle.textContent;
  }

  setEventListeners(evt) {
    const closePopupButton = document.querySelector(".popup__close-button");
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = descriptionInput.value;
    closePopupButton.addEventListener('click', close());
  }

  close() {
    super.close();
    const popupToClose = document.querySelector(".popup_opened");
    removeEventListenersFromPopup();
    if (popupToClose != null) popupToClose.classList.remove("popup_opened");
    this.nameInput = "";
    this.descriptionInput = "";
  }
}
