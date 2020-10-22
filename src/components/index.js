import '../pages/index.css'; // добавьте импорт главного файла стилей

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import Api from './Api.js';

const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const userPic = document.querySelector(".profile__photo");
const editUserpicButton = document.querySelector(".profile__photo-edit-button");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

const popupProfile = document.querySelector(".popup-profile");
const profileForm = popupProfile.querySelector(".popup__form");
const popupProfileInputElement = profileForm.querySelector('.popup__input');
const popupProfileName = popupProfile.querySelector(".popup__input__profile_name");
const popupProfileDescription = popupProfile.querySelector(".popup__input_description");
const popupProfileSubmitButton = popupProfile.querySelector('.popup__submit-button');
const inputProfileElementsArr = profileForm.querySelectorAll('.popup__input');

const popupPlace = document.querySelector(".popup-place");
const placeFormContainer = popupPlace.querySelector(".popup__container");
const placeForm = popupPlace.querySelector(".popup__form");
const popupPlaceInputElement = placeForm.querySelector('.popup__input');
const newCardTitle = document.querySelector(".popup__input_place-name");
const popupPlaceUrl = popupPlace.querySelector(".popup__input_url");
const popupPlaceSubmitButton = popupPlace.querySelector('.popup__submit-button');
const inputPlaceElementsArr = placeForm.querySelectorAll('.popup__input');

const popupUserpic = document.querySelector('.popup-userpic');
const popupUserpicForm = popupUserpic.querySelector('.popup__form');
const newUserpicUrl = popupUserpic.querySelector('.popup__input_url');
const popupUserpicSubmitButton = popupUserpic.querySelector('.popup__submit-button');
const inputUserpicElementsArr = popupUserpic.querySelectorAll('.popup__input');

let PopupCardDelete = document.querySelector('.popup-delete');
const submitButton = PopupCardDelete.querySelector('.popup__submit-button');

const BaseUrl = "https://mesto.nomoreparties.co/v1/cohort-16/";
const token = 'ecd5d904-ba49-4381-9016-a76df3cbb46c';

const api = new Api(BaseUrl, token);

Promise.all([api.getUserInfo(), api.getCards()])
.then((res) => {

  const myIdOnServer = res[0]._id

  const instancePopupWithImage = new PopupWithImage('.popup-zoom');
  const popupProfileForm = new PopupWithForm('.popup-profile', () => {
  showState(popupProfileSubmitButton);
  api.setUserInfo(popupProfileName.value, popupProfileDescription.value)
    .then((res) => {
      instanceUserInfo.setUserInfo({ nameInput: res.name, descriptionInput: res.about, avatar: res.avatar });
      profileTitle.textContent = instanceUserInfo.getUserInfo().name;
      profileSubTitle.textContent = instanceUserInfo.getUserInfo().description;
      popupProfileForm.close();
    })
    .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")})
    .finally(() => {popupProfileSubmitButton.textContent = 'Сохранить'});
});

const popupPlaceForm = new PopupWithForm('.popup-place', (evt) => { submitAddCard(evt) });
  const instanceUserInfo = new UserInfo({ nameInput: res[0].name, descriptionInput: res[0].about, avatar: res[0].avatar });
  instanceUserInfo.setUserInfo({ nameInput: res[0].name, descriptionInput: res[0].about, avatar: res[0].avatar });
  profileTitle.textContent = instanceUserInfo.getUserInfo().name;
  profileSubTitle.textContent = instanceUserInfo.getUserInfo().description;
  userPic.src = instanceUserInfo.getUserInfo().avatar;

  const cardSection = new Section({
    items: res[1].reverse(),
    renderer: (item) => {
      const card = new Card(item.name, item.link, item._id, item.owner._id, item.likes, myIdOnServer, instancePopupWithImage.open.bind(instancePopupWithImage), () => {
        const PopupCardDelete = new PopupWithForm('.popup-delete', () => {
          showStateDeleting(submitButton);
          api.deleteMyCard(item._id)
            .then(() => {
              card.deleteCard();
              PopupCardDelete.close()
            })
            .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")})
            .finally(() => {submitButton.textContent = 'Да'})
        });
        PopupCardDelete.open.call(PopupCardDelete);
      },
        () => {
          if (card.isLiked()) {
            api.deleteLike(item._id)
              .then((res) => {
                card.handleCounter(res.likes)
              })
              .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")});
          }
          else {
            api.putLike(item._id)
              .then((res) => {
                card.handleCounter(res.likes)
              })
              .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")});
          }
        });
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    }
  },
    ".cards");
  cardSection.renderItems();


function showState(actionButton) {
  actionButton.textContent = "Сохранение..."
}

function showStateDeleting(actionButton) {
  actionButton.textContent = "Удаление..."
}

function submitAddCard(evt) {
  evt.preventDefault();
  showState(popupPlaceSubmitButton);
  api.addNewCard(newCardTitle.value, popupPlaceUrl.value)
    .then((res) => {
      const card = new Card(res.name, res.link, res._id, myIdOnServer, res.likes, myIdOnServer, instancePopupWithImage.open.bind(instancePopupWithImage), () => {
        const PopupCardDelete = new PopupWithForm('.popup-delete', () => {

          showStateDeleting(submitButton);
          api.deleteMyCard(res._id)
            .then(() => {
              card.deleteCard();
              PopupCardDelete.close()
            })
            .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")})
            .finally(() => {submitButton.textContent = 'Да'})
        });
        PopupCardDelete.open.call(PopupCardDelete)
      },
        () => {
          if (card.isLiked()) {
            api.deleteLike(res._id)
              .then((res) => {
                card.handleCounter(res.likes)
              })
              .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")});
          }
          else {
            api.putLike(res._id)
              .then((res) => {
                card.handleCounter(res.likes)
              })
              .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")});
          }
        })
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      newCardTitle.value = "";
      popupPlaceUrl.value = "";
      popupPlaceForm.close();
    })
    .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")})
    .finally(() => {popupPlaceSubmitButton.textContent = "Создать"});
}

function editButtonHandler(evt) {
  evt.preventDefault();
  popupProfileName.value = instanceUserInfo.getUserInfo().name;
  popupProfileDescription.value = instanceUserInfo.getUserInfo().description;
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
    api.updateAvatar(newUserpicUrl.value)
      .then((res) => {
        userPic.src = res.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")})
      .finally (() => {popupUserpicSubmitButton.textContent = "Сохранить"});
  });
  editAvatar.clearInputError(inputUserpicElementsArr, popupUserpicForm, document.querySelector('.popup-userpic__input'));
  editAvatarPopup.open.call(editAvatarPopup);
  popupUserpicForm.reset();
}

const editForm = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button_disabled', 'popup__input_type-error', 'popup__input-error-message_active');
const addForm = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button_disabled', 'popup__input_type-error', 'popup__input-error-message_active');
const editAvatar = new FormValidator('.popup__form', '.popup__input', '.popup__submit-button', 'popup__submit-button_disabled', 'popup__input_type-error', 'popup__input-error-message_active');
editForm.enableValidation();
addForm.enableValidation();
editAvatar.enableValidation();

editButton.addEventListener("click", editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
placeFormContainer.addEventListener('submit', submitAddCard);
editUserpicButton.addEventListener('click', editAvatarHandler)

})
.catch((err) => {console.log(err), alert("Что-то пошло не так, попробуйте ещё раз.")});
