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
    const currentPopup = document.querySelector(".popup_opened");
    const closeButton = currentPopup.querySelector(".popup__close-button");
    const submitButton = currentPopup.querySelector(".popup__submit-button");
    closeButton.addEventListener('click', this.close);
    submitButton.addEventListener('click', this._submitForm);
  }

  removeEventListenersFromPopup() {
    super.removeEventListenersFromPopup();
    const currentPopup = document.querySelector(".popup_opened");
    const closeButton = currentPopup.querySelector(".popup__close-button");
    const submitButton = currentPopup.querySelector(".popup__submit-button");
    closeButton.removeEventListener('click', this.close);
    submitButton.removeEventListener('click', this._submitForm);
  }
}
