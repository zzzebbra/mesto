class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }

  _cardContentNew() {
    const card = document.querySelector(".card-template").content.querySelector('.card').cloneNode(true);
    return card;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._cardContentNew();

    this._element.querySelector('.card__photo').src = this.link;
    this._element.querySelector('.card__text').textContent = this.name;
    this._element.querySelector(".card__like").addEventListener('click', this.like);
    this._element.querySelector(".card__delete-button").addEventListener('click', this.deleteCard);
    this._element.querySelector(".card__photo").addEventListener('click', () => this.openPopup(this.name, this.link));

    return this._element;
  }

  like(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  openPopup() {
    document.querySelector(".popup-zoom").classList.add("popup_opened");
    document.querySelector(".popup-zoom__caption").textContent = this.name;
    document.querySelector(".popup-zoom__image").src = this.link;
    document.querySelector(".popup-zoom__image").alt = this.name;
    document.addEventListener('keyup', (evt) => { if (evt.key === "Escape") { this.closeAnyPopup(); } });
    document.querySelector(".popup-zoom").addEventListener('mousedown', (evt) => {
      const currentPopup = document.querySelector(".popup_opened");
      if (evt.target === currentPopup) { this.closeAnyPopup(); }
    });
  }

  removeEventListenersFromPopup() {
    document.removeEventListener('keyup', this.closeAtEsc);
  }

  closeAnyPopup() {
    console.log('closeAnyPopup')
    const popupToClose = document.querySelector(".popup_opened");
    this.removeEventListenersFromPopup();
    if (popupToClose != null) popupToClose.classList.remove("popup_opened");
  }


}

export default Card
