import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const popupProfile = document.querySelector(".popup_profile");
const popupPlace = document.querySelector(".popup_new-place");
const profileForm = popupProfile.querySelector(".popup__form");
const placeForm = popupPlace.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const placeFormContainer = popupPlace.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__input_name");
const descriptionInput = document.querySelector(".popup__input_description");
const cards = document.querySelector(".cards");
const cardTitle = document.querySelector(".popup__input_place-name");
const cardUrl = document.querySelector(".popup__input_url");
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
const instanceUserInfo = new UserInfo( {name: profileTitle.textContent, description: profileSubTitle.textContent} );
const popupProfileForm = new PopupWithForm('.popup_profile', () => {


  popupProfileForm.close();
});
const popupPlaceForm = new PopupWithForm('.popup_new-place', () => {
  instanceUserInfo.setUserInfo({ nameInput: nameInput.value, descriptionInput: descriptionInput.value});
  profileTitle.textContent = instanceUserInfo.getUserInfo().name;
  profileSubTitle.textContent = instanceUserInfo.getUserInfo().description;
  popupPlaceForm.close();
});

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
  popupPlaceForm.close();
}

function editButtonHandler() {
  nameInput.value = instanceUserInfo.getUserInfo().name;
  descriptionInput.value = instanceUserInfo.getUserInfo().description;
  editForm.checkButtonState(profileForm);
  popupProfileForm.open();
}

function addButtonHandler() {
  addForm.checkButtonState(placeForm);
  popupPlaceForm.open();
}

const editForm = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button-disabled', 'popup__input_type-error', 'popup__input-error-message_active');
const addForm =  new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button-disabled', 'popup__input_type-error', 'popup__input-error-message_active');
editForm.enableValidation();
addForm.enableValidation();


editButton.addEventListener("click", editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
placeFormContainer.addEventListener('submit', submitAddCard);
