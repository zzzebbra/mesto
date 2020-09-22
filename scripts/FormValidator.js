class FormValidator {
  constructor(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    this.formSelector = formSelector;
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
  }

showInputError  (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  };

hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

setButtonState(inputList, buttonElement) {
  if (this.hasInvalidInput(inputList)) {
    buttonElement.classList.add(this.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(this.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

checkButtonState(formElement) {
  const buttonElement = formElement.querySelector(".popup__submit-button");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  this.setButtonState(inputList, buttonElement, 'popup__submit-button-disabled');
};

toggleButtonState (inputList, buttonElement)  {
  this.setButtonState(inputList, buttonElement, this.inactiveButtonClass);
};

hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this.inputErrorClass);
  errorElement.classList.remove(this.errorClass);
  errorElement.textContent = '';
};

checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    this.showInputError(formElement, inputElement, inputElement.validationMessage, this.inputErrorClass, this.errorClass);
  } else {
    this.hideInputError(formElement, inputElement, this.inputErrorClass, this.errorClass);
  }
};

setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
  const buttonElement = formElement.querySelector(this.submitButtonSelector);
  this.toggleButtonState(inputList, buttonElement, this.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this.toggleButtonState(inputList, buttonElement, this.inactiveButtonClass);
      this.checkInputValidity(formElement, inputElement, this.inputErrorClass, this.errorClass);
    });
  });
};

enableValidation(){
  const formList = Array.from(document.querySelectorAll(this.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this.setEventListeners(formElement);
  });
};
};



export default FormValidator
