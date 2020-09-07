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
const card = document.querySelector(".card-template").content;
const cardTitle = document.querySelector(".popup__input_place-name");
const cardUrl = document.querySelector(".popup__input_url");
const popupZoom = document.querySelector(".popup-zoom");
const popupCardCaption = popupZoom.querySelector(".popup-zoom__caption");
const popupCardImage = popupZoom.querySelector(".popup-zoom__image");
const popupZoomCloseButton = popupZoom.querySelector(".popup-zoom__close-button");
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

function addCard(name, link) {
  const cardContentNew = card.cloneNode(true);
  const popupCardImage = cardContentNew.querySelector(".card__photo");
  cardContentNew.querySelector(".card__text").textContent = name;
  popupCardImage.src = link;
  popupCardImage.alt = name;
  const deleteButton = cardContentNew.querySelector(".card__delete-button");
  const likeButton = cardContentNew.querySelector(".card__like");
  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', deleteCard);
  popupCardImage.addEventListener('click', () => openPopupZoom(name, link));
  return cardContentNew;
}

function submitAddCard(evt) {
  evt.preventDefault();
  cards.prepend(addCard(cardTitle.value, cardUrl.value));
  cardTitle.value = "";
  cardUrl.value = "";
  closeAnyPopup();
}

function renderCards(array) {
  array.reverse().forEach((item) => { cards.prepend(addCard(item.name, item.link)) });
}

renderCards(cardsArr);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closeAtEsc);
  popup.addEventListener('mousedown', closePopupByMouse);
}

function removeEventListenersFromPopup() {
  document.removeEventListener('keyup', closeAtEsc);
}

function closeAnyPopup() {
  const popupToClose = document.querySelector(".popup_opened");
  removeEventListenersFromPopup();
  if (popupToClose != null) popupToClose.classList.remove("popup_opened");
}

function closeAtEsc(evt) {
  if (evt.key === "Escape") { closeAnyPopup() }
};

function closePopupByMouse(evt) {
  const currentPopup = document.querySelector(".popup_opened");
  if (evt.target === currentPopup) { closeAnyPopup(); currentPopup.removeEventListener('mousedown', closePopupByMouse) }
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubTitle.textContent;
  checkButtonState(profileForm);
  openPopup(popupProfile);
}

function openPopupPlace() {
  checkButtonState(placeForm);
  openPopup(popupPlace);
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = descriptionInput.value;
  closeAnyPopup();
}

function like(evt) {
  evt.target.classList.toggle("card__like_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function openPopupZoom(name, link) {
  openPopup(popupZoom)
  popupCardCaption.textContent = name;
  popupCardImage.src = link;
  popupCardImage.alt = name;
}

profileFormContainer.addEventListener('submit', submitFormProfile);
editButton.addEventListener("click", openPopupProfile);
closeProfileButton.addEventListener("click", closeAnyPopup);
closePlaceButton.addEventListener("click", closeAnyPopup);
addButton.addEventListener('click', openPopupPlace);
placeFormContainer.addEventListener('submit', submitAddCard);
popupZoomCloseButton.addEventListener('click', closeAnyPopup);
