export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
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
    if (evt.target === currentPopup) { this.close(); currentPopup.removeEventListener('mousedown', this._closePopupByMouse) }
  }
  removeEventListenersFromPopup() {
    const popupZoomTemp = document.querySelector(".popup-zoom");
    const closePopupButton = popupZoomTemp.querySelector(".popup__close-button");
    closePopupButton.removeEventListener('keyup', this._handleEscClose);
  }
  close() {
    const popupToClose = document.querySelector(".popup_opened");
    this.removeEventListenersFromPopup();
    if (popupToClose != null) popupToClose.classList.remove("popup_opened");
  }

  setEventListeners() {
    const currentPopup = document.querySelector(".popup_opened");
    document.addEventListener('keyup', this._handleEscClose.bind(this));
    currentPopup.addEventListener('mousedown', this._closePopupByMouse.bind(this));
  }
}
