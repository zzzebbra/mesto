class Card {
  constructor( name, link, handleCardClick ) {
    this.name = name;
    this.link = link;
    this.handleCardClick = handleCardClick;
  }

  _cardContentNew() {
    const card = document.querySelector(".card-template").content.querySelector('.card').cloneNode(true);
    return card;
  }

  generateCard() {
    this._element = this._cardContentNew();

    this._element.querySelector('.card__photo').src = this.link;
    this._element.querySelector('.card__text').textContent = this.name;
    this._element.querySelector(".card__like").addEventListener('click', this.like);
    this._element.querySelector(".card__delete-button").addEventListener('click', this.deleteCard.bind(this));
    this._element.querySelector(".card__photo").addEventListener('click', () => this.handleCardClick(this.name, this.link));

    return this._element;
  }

  like(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  deleteCard() {
    this._element.closest(".card").remove();
  }

}

export default Card
