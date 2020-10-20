import '../pages/index.css'; // добавьте импорт главного файла стилей

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import Api from './Api.js';

const popupProfile = document.querySelector(".popup_profile");
const popupProfileName = popupProfile.querySelector(".popup__input_name");
const popupProfileDescription = popupProfile.querySelector(".popup__input_description");
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
const cardTitle = document.querySelector(".popup__input_place-name");
const cardUrl = document.querySelector(".popup__input_url");
const editAvatarButton = document.querySelector(".profile__photo-edit-button");
const userPic = document.querySelector(".profile__photo");
const newAvatarUrl = document.querySelector('.popup-userpic__input');
const popupUserpicSubmitButton = document.querySelector('.popup-userpic__submit-button');
const popupPlaceSubmitButton = document.querySelector('.popup__submit-button_place');
const popupProfileSubmitButton = document.querySelector('.popup__submit-button_profile');
const popupProfileInputElement = profileForm.querySelector('.popup__input');
const popupPlaceInputElement = placeForm.querySelector('.popup__input');
const inputProfileElementsArr = profileForm.querySelectorAll('.popup__input');
const inputPlaceElementsArr = placeForm.querySelectorAll('.popup__input');
const popupUserpic = document.querySelector('.popup-userpic');
const popupUserpicForm = popupUserpic.querySelector('.popup__form');
const inputUserpicElementsArr = popupUserpicForm.querySelectorAll('.popup__input');

const BaseUrl = "https://mesto.nomoreparties.co/v1/cohort-16/";
const token = 'ecd5d904-ba49-4381-9016-a76df3cbb46c';
const myIdOnServer = 'd9950d1e6ec066454d7e5681';

const api = new Api(BaseUrl, token);
let cardSection;
api.getCards()
  .then((result) => {
    cardSection = new Section({
      items: result.reverse(),
      renderer: (item) => {
        const card = new Card(item.name, item.link, item._id, item.owner._id, item.likes, myIdOnServer, instancePopupWithImage.open.bind(instancePopupWithImage), () => {
          const PopupCardDelete = new PopupWithForm('.popup-delete', () => {
            api.deleteMyCard(item._id)
              .then(() => {
                card.deleteCard();
                PopupCardDelete.close()
              })
              .catch((err) => console.log(err));
          });
          PopupCardDelete.open.call(PopupCardDelete);
        },
          () => {
            if (card.isLiked()) {
              api.deleteLike(item._id)
                .then((res) => {
                  card.handleCounter(res.likes)
                })
                .catch((err) => console.log(err));
            }
            else {
              api.putLike(item._id)
                .then((res) => {
                  card.handleCounter(res.likes)
                })
                .catch((err) => console.log(err));
            }
          });
        const cardElement = card.generateCard();
        cardSection.addItem(cardElement);
      }
    },
      ".cards");
    cardSection.renderItems();
  })
  .catch((err) => console.log(err));

function showState(actionButton) {
  actionButton.textContent = "Сохранение..."
}

const instancePopupWithImage = new PopupWithImage('.popup-zoom');

let instanceUserInfo;

api.getUserInfo()
  .then((res) => {
    instanceUserInfo = new UserInfo({ nameInput: res.name, descriptionInput: res.about, avatar: res.avatar });
    instanceUserInfo.setUserInfo({ nameInput: res.name, descriptionInput: res.about, avatar: res.avatar });
    profileTitle.textContent = instanceUserInfo.getUserInfo().name;
    profileSubTitle.textContent = instanceUserInfo.getUserInfo().description;
    userPic.src = instanceUserInfo.getUserInfo().avatar;
  })
  .catch((err) => console.log(err));

const popupProfileForm = new PopupWithForm('.popup_profile', () => {
  showState(popupProfileSubmitButton);
  api.setUserInfo(popupProfileName.value, popupProfileDescription.value)
    .then((res) => {
      instanceUserInfo.setUserInfo({ nameInput: res.name, descriptionInput: res.about, avatar: res.avatar });
      profileTitle.textContent = instanceUserInfo.getUserInfo().name;
      profileSubTitle.textContent = instanceUserInfo.getUserInfo().description;
      popupProfileSubmitButton.textContent = 'Сохранить'
    })
    .catch((err) => console.log(err));
  popupProfileForm.close();
});

const popupPlaceForm = new PopupWithForm('.popup_new-place', () => { submitAddCard(evt) });

function submitAddCard(evt) {
  evt.preventDefault();
  showState(popupPlaceSubmitButton);
  api.addNewCard(cardTitle.value, cardUrl.value)
    .then((res) => {
      const card = new Card(res.name, res.link, res._id, myIdOnServer, res.likes, myIdOnServer, instancePopupWithImage.open.bind(instancePopupWithImage), () => {
        const PopupCardDelete = new PopupWithForm('.popup-delete', () => {
          api.deleteMyCard(res._id)
            .then(() => {
              card.deleteCard();
              PopupCardDelete.close()
            })
            .catch((err) => console.log(err));
        });
        PopupCardDelete.open.call(PopupCardDelete)
      },
        () => {
          if (card.isLiked()) {
            api.deleteLike(res._id)
              .then((res) => {
                card.handleCounter(res.likes)
              })
              .catch((err) => console.log(err));
          }
          else {
            api.putLike(res._id)
              .then((res) => {
                card.handleCounter(res.likes)
              })
              .catch((err) => console.log(err));
          }
        })
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      popupPlaceSubmitButton.textContent = "Создать";
    })
    .catch((err) => console.log(err));
  cardTitle.value = "";
  cardUrl.value = "";
  popupPlaceForm.close();
}

function editButtonHandler(evt) {
  evt.preventDefault();
  nameInput.value = instanceUserInfo.getUserInfo().name;
  descriptionInput.value = instanceUserInfo.getUserInfo().description;
  editForm.checkButtonState(profileForm);
  addForm.clearInputError(inputProfileElementsArr, profileForm, popupProfileInputElement);
  popupProfileForm.open();
}

function addButtonHandler() {
  addForm.clearInputError(inputPlaceElementsArr, placeForm, popupPlaceInputElement);
  placeForm.reset();
  addForm.checkButtonState(placeForm);
  popupPlaceForm.open();
}

function editAvatarHandler() {
  const editAvatarPopup = new PopupWithForm('.popup-userpic', () => {
    showState(popupUserpicSubmitButton);
    api.updateAvatar(newAvatarUrl.value)
      .then((res) => {
        userPic.src = res.avatar;
        popupUserpicSubmitButton.textContent = "Сохранить"
      })
      .catch((err) => console.log(err));
    editAvatarPopup.close();
  });
  editAvatar.clearInputError(inputUserpicElementsArr, popupUserpicForm, document.querySelector('.popup-userpic__input'));
  editAvatarPopup.open.call(editAvatarPopup);
  popupUserpicForm.reset();

}

const editForm = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button-disabled', 'popup__input_type-error', 'popup__input-error-message_active');
const addForm = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button-disabled', 'popup__input_type-error', 'popup__input-error-message_active');
const editAvatar = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button-disabled', 'popup__input_type-error', 'popup__input-error-message_active');
editForm.enableValidation();
addForm.enableValidation();
editAvatar.enableValidation();


editButton.addEventListener("click", editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
placeFormContainer.addEventListener('submit', submitAddCard);
editAvatarButton.addEventListener('click', editAvatarHandler)

export { myIdOnServer }
