import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWitnImage.js';
import Section from './Section.js'

const popupProfile = document.querySelector(".popup_profile");
const popupPlace = document.querySelector(".popup_new-place");
const profileForm = popupProfile.querySelector(".popup__form");
const placeForm = popupPlace.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const closeProfileButton = popupProfile.querySelector(".popup__close-button");
const closePlaceButton = popupPlace.querySelector(".popup__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const profileFormContainer = popupProfile.querySelector(".popup__container");
const placeFormContainer = popupPlace.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__input_name");
const descriptionInput = document.querySelector(".popup__input_description");
const cards = document.querySelector(".cards");
const cardTitle = document.querySelector(".popup__input_place-name");
// const cardImage = document.querySelector('.card__photo');
const cardUrl = document.querySelector(".popup__input_url");
const popupZoom = document.querySelector(".popup-zoom");
// const popupZoomImage = document.querySelector(".popup-zoom__image");
// const popupZoomCaption = document.querySelector(".popup-zoom__caption");
// const popupZoomCloseButton = popupZoom.querySelector(".popup-zoom__close-button");
const cardsArr = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const instancePopupWithImage = new PopupWithImage('.popup-zoom');

const cardSection = new Section({
  items: cardsArr,
  renderer: (item) => {
    const card = new Card(item.name, item.link, instancePopupWithImage.open.bind(instancePopupWithImage));
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
  }
},
".cards");

cardSection.renderItems();

function submitAddCard(evt) {
  evt.preventDefault();
  const card = new Card(cardTitle.value, cardUrl.value);
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
  cardTitle.value = "";
  cardUrl.value = "";
  closeAnyPopup();
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubTitle.textContent;
  editForm.checkButtonState(profileForm);
  openPopup(popupProfile);
}

function openPopupPlace() {
  addForm.checkButtonState(placeForm);
  openPopup(popupPlace);
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = descriptionInput.value;
  closeAnyPopup();
}

const editForm = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button-disabled', 'popup__input_type-error', 'popup__input-error-message_active');
const addForm =  new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button-disabled', 'popup__input_type-error', 'popup__input-error-message_active');
editForm.enableValidation();
addForm.enableValidation();

profileFormContainer.addEventListener('submit', submitFormProfile);
editButton.addEventListener("click", openPopupProfile);
//closeProfileButton.addEventListener("click", closeAnyPopup);
//closePlaceButton.addEventListener("click", closeAnyPopup);
addButton.addEventListener('click', openPopupPlace);
placeFormContainer.addEventListener('submit', submitAddCard);
