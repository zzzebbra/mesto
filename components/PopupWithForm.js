import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.removeEventListenersFromPopup = this.removeEventListenersFromPopup.bind(this);
  }

  _getInputValues() {
    const nameInput = document.querySelector(".popup__input_name");
    const descriptionInput = document.querySelector(".popup__input_description");
    const profileTitle = document.querySelector(".profile__title");
    const profileSubTitle = document.querySelector(".profile__subtitle");
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileSubTitle.textContent;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this.nameInput = "";
    this.descriptionInput = "";
  }

  setEventListeners() {
    super.setEventListeners();
    const popupProfileTemp = document.querySelector(".popup_profile");
    const popupPlaceTemp = document.querySelector(".popup_new-place");
    const closeProfileButton = popupProfileTemp.querySelector(".popup__close-button");
    const closePlaceButton = popupPlaceTemp.querySelector(".popup__close-button");
    closeProfileButton.addEventListener('click', this.close);
    closePlaceButton.addEventListener('click', this.close);
    popupProfileTemp.addEventListener('submit', this._submitForm);
  }

  removeEventListenersFromPopup() {
    super.removeEventListenersFromPopup();
    const popupProfileTemp = document.querySelector(".popup_profile");
    const closeProfileButton = popupProfileTemp.querySelector(".popup__close-button");
    closeProfileButton.removeEventListener('click', this.close);
  }
}
