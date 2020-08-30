const popupProfile = document.querySelector(".popup_profile");
const popupPlace = document.querySelector(".popup_new-place");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const closeProfileButton = popupProfile.querySelector(".popup__close-button");
const closePlaceButton = popupPlace.querySelector(".popup__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const profileForm = popupProfile.querySelector(".popup__container");
const placeForm = popupPlace.querySelector(".popup__container");
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

function addCard(name, link) {
  const cardContentNew = card.cloneNode(true);
  cardContentNew.querySelector(".card__text").textContent = name;
  cardContentNew.querySelector(".card__photo").src = link;
  const deleteButton = cardContentNew.querySelector(".card__delete-button");
  const likeButton = cardContentNew.querySelector(".card__like");
  const popupCardImage = cardContentNew.querySelector(".card__photo");
  const popupCardCaption = cardContentNew.querySelector(".card__text");
  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', deleteCard);
  popupCardImage.addEventListener('click', () => zoomCardPhoto(name, link));
  return cardContentNew;
}

function submitAddCard(evt) {
  evt.preventDefault();
  cards.prepend(addCard(cardTitle.value, cardUrl.value));
  closePopup(popupPlace);
}

function renderCards(array) {
  array.reverse().forEach((item) => { cards.prepend(addCard(item.name, item.link)) });
}

renderCards(cardsArr);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubTitle.textContent;
  openPopup(popupProfile);
}

function openPopupPlace() {
  openPopup(popupPlace);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

function like(evt) {
  evt.target.classList.toggle("card__like_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function closePopupZoom() {
  popupZoom.classList.remove("popup-zoom_opened");
}

function zoomCardPhoto(name, link) {
  popupZoom.classList.add("popup-zoom_opened");
  popupCardCaption.textContent = name;
  popupCardImage.src = link;
}

profileForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener("click", openPopupProfile);
closeProfileButton.addEventListener("click", () => { closePopup(popupProfile) });
closePlaceButton.addEventListener("click", () => { closePopup(popupPlace) });
addButton.addEventListener('click', openPopupPlace);
placeForm.addEventListener('submit', submitAddCard);
popupZoomCloseButton.addEventListener('click', closePopupZoom);
