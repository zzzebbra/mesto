const popupProfile = document.querySelector(".popup_profile");
const popupPlace = document.querySelector(".popup_new-place");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const closeProfileButton = popupProfile.querySelector(".popup__close-button");
const closePlaceButton = popupPlace.querySelector(".popup__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__input_name");
const descriptionInput = document.querySelector(".popup__input_description");
const cards = document.querySelector(".cards");
const card = document.querySelector(".card-template").content;
const cardTitle = document.querySelector(".popup__input_place-name");
const cardUrl = document.querySelector(".popup__input_url");
const cardCreateButton = document.querySelector(".popup__submit-button_place");
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

function initialCard(name, link) {
  const cardContent = card.cloneNode(true);
  cardContent.querySelector(".card__text").textContent = name;
  cardContent.querySelector(".card__photo").src = link;
  const deleteButton = cardContent.querySelector(".card-delete-button");
  const likeButton = cardContent.querySelector(".card__like");
  const popupCardImage = cardContent.querySelector(".card__photo");
  const popupCardCaption = cardContent.querySelector(".card__text");
  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', cardDelete);
  popupCardImage.addEventListener('click', () => cardPhotoZoom(name, link));
  cards.append(cardContent);
}

function renderCards(array) {
  array.forEach((item) => { initialCard(item.name, item.link) })
}
renderCards(cardsArr);

function addCard(evt) {
  evt.preventDefault();
  const cardContentNew = card.cloneNode(true);
  cardContentNew.querySelector(".card__text").textContent = cardTitle.value;
  cardContentNew.querySelector(".card__photo").src = cardUrl.value;
  const deleteButton = cardContentNew.querySelector(".card-delete-button");
  const likeButton = cardContentNew.querySelector(".card__like");
  const popupCardImage = cardContentNew.querySelector(".card__photo");
  const popupCardCaption = cardContentNew.querySelector(".card__text");
  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', cardDelete);
  popupCardImage.addEventListener('click', () => cardPhotoZoom(name, link));
  cards.prepend(cardContentNew);
  popupClose(popupPlace);
}

function popupProfileOpen() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubTitle.textContent;
  popupProfile.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

function popupPlaceOpen() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubTitle.textContent;
  popupPlace.classList.add("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = descriptionInput.value;
  popupClose(popupProfile);
}

function like(evt) {
  evt.target.classList.toggle("card__like_active");
}

function cardDelete(evt) {
  evt.target.closest(".card").remove();
}

function popupZoomClose() {
  popupZoom.classList.remove("popup-zoom_opened");
}

function cardPhotoZoom(name, link) {
  popupZoom.classList.add("popup-zoom_opened");
  popupCardCaption.textContent = name;
  popupCardImage.src = link;
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener("click", popupProfileOpen);
closeProfileButton.addEventListener("click", () => { popupClose(popupProfile) });
closePlaceButton.addEventListener("click", () => { popupClose(popupPlace) });
addButton.addEventListener('click', popupPlaceOpen);
cardCreateButton.addEventListener('click', addCard);
popupZoomCloseButton.addEventListener('click', popupZoomClose);
