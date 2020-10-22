import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.removeEventListenersFromPopup = this.removeEventListenersFromPopup.bind(this);
  }

  open(name, link) {
    super.open();
    const popupZoomCaption = document.querySelector(".popup__caption_zoom");
    const popupZoomImage = document.querySelector(".popup__image_zoom");
    popupZoomCaption.textContent = name;
    popupZoomImage.alt = name;
    popupZoomImage.src = link;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    const popupZoomTemp = document.querySelector(".popup-zoom");
    const closePopupButton = popupZoomTemp.querySelector(".popup__close-button");
    closePopupButton.addEventListener('click', this.close);
  }

  removeEventListenersFromPopup() {
    super.removeEventListenersFromPopup();
    const popupZoomTemp = document.querySelector(".popup-zoom");
    const closePopupButton = popupZoomTemp.querySelector(".popup__close-button");
    closePopupButton.removeEventListener('click', this.close);
  }
}
