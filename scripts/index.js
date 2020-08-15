let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubTitle = document.querySelector(".profile__subtitle");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_name");
let descriptionInput = document.querySelector(".popup__input_description");

function popupOpen() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileSubTitle.textContent;
    popup.classList.add("popup_opened");
}   
 
function popupClose() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = descriptionInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);