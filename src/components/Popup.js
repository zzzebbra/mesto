export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupByMouse = this._closePopupByMouse.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") { this.close(); }
  }

  _closePopupByMouse(evt) {
    const currentPopup = document.querySelector(".popup_opened");
    if (evt.target === currentPopup) { this.close() }
  }

  close() {
    this.removeEventListenersFromPopup();
    const popupToClose = document.querySelector(".popup_opened");
    if (popupToClose != null) popupToClose.classList.remove("popup_opened");

  }

  setEventListeners() {
    const currentPopup = document.querySelector(".popup_opened");
    currentPopup.addEventListener('mouseup', this._closePopupByMouse);
    document.addEventListener('keyup', this._handleEscClose);
  }

  removeEventListenersFromPopup() {
    const currentPopup = document.querySelector(".popup_opened");
    currentPopup.removeEventListener('mouseup', this._closePopupByMouse);
    document.removeEventListener('keyup', this._handleEscClose);
  }
}
