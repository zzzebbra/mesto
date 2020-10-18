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
    const popupCardDeleteTemp = document.querySelector(".popup-delete");
    const popupUpdateAvatarTemp = document.querySelector(".popup-userpic");
    const closeProfileButton = popupProfileTemp.querySelector(".popup__close-button");
    const closePlaceButton = popupPlaceTemp.querySelector(".popup__close-button");
    const closeCardDeleteButton = popupCardDeleteTemp.querySelector(".popup-delete__close-button");
    const closeAvUpdateButton = popupUpdateAvatarTemp.querySelector(".popup-userpic__close-button");
    const submitCardDeleteButton = popupCardDeleteTemp.querySelector(".popup-delete__submit-button");
    const submitAvUpdateButton = popupUpdateAvatarTemp.querySelector(".popup-userpic__submit-button");
    closeProfileButton.addEventListener('click', this.close);
    closePlaceButton.addEventListener('click', this.close);
    closeCardDeleteButton.addEventListener('click', this.close);
    closeAvUpdateButton.addEventListener('click', this.close);
    popupProfileTemp.addEventListener('submit', this._submitForm);
    submitCardDeleteButton.addEventListener('click', this._submitForm);
    submitAvUpdateButton.addEventListener('click', this._submitForm);
  }

  removeEventListenersFromPopup() {
    super.removeEventListenersFromPopup();
    const popupProfileTemp = document.querySelector(".popup_profile");
    const closeProfileButton = popupProfileTemp.querySelector(".popup__close-button");
    const popupCardDeleteTemp = document.querySelector(".popup-delete");
    const popupUpdateAvatarTemp = document.querySelector(".popup-userpic");
    const closeCardDeleteButton = popupCardDeleteTemp.querySelector(".popup-delete__close-button");
    const submitCardDeleteButton = popupCardDeleteTemp.querySelector(".popup-delete__submit-button");
    const closeAvUpdateButton = popupUpdateAvatarTemp.querySelector(".popup-userpic__close-button");
    const submitAvUpdateButton = popupUpdateAvatarTemp.querySelector(".popup-userpic__submit-button");
    closeProfileButton.removeEventListener('click', this.close);
    closeCardDeleteButton.removeEventListener('click', this.close);
    submitCardDeleteButton.removeEventListener('click', this._submitForm);
    closeAvUpdateButton.removeEventListener('click', this.close);
    submitAvUpdateButton.removeEventListener('click', this._submitForm);
  }
}
