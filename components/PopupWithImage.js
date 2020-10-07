import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(name, link) {
    super.open();
    const popupZoomCaption = document.querySelector(".popup-zoom__caption");
    const popupZoomImage = document.querySelector(".popup-zoom__image");
    popupZoomCaption.textContent = name;
    popupZoomImage.alt = name;
    popupZoomImage.src = link;
  }

  close() {
    super.close();
    this.removeEventListenersFromPopup();
  }

  removeEventListenersFromPopup() {
    const popupZoomTemp = document.querySelector(".popup-zoom");
    const closePopupButton = popupZoomTemp.querySelector(".popup__close-button");
    closePopupButton.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    super.setEventListeners();
    const popupZoomTemp = document.querySelector(".popup-zoom");
    const closePopupButton = popupZoomTemp.querySelector(".popup__close-button");
    closePopupButton.addEventListener('click', this.close.bind(this));
  }
}
