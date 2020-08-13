let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubTitle = document.querySelector(".profile__subtitle");

let formElement = document.querySelector(".popup__container");

let nameInput = document.querySelector("#name");
let descriptionInput = document.querySelector("#description");

nameInput.value = profileTitle.textContent;
descriptionInput.value = profileSubTitle.textContent;


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    console.log(nameInput.value);

    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = descriptionInput.value;
}



formElement.addEventListener('submit', formSubmitHandler);

function popupOpen() {
    popup.classList.add("popup_opened");
}

function popupClose() {
    popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);


