class Card {
  constructor( name, link, cardId, ownerId, likesArr, myIdOnServer, handleCardClick, handleDeleteClick, handleLikeClick) {
    this.name = name;
    this.link = link;
    this.cardId = cardId;
    this.ownerId = ownerId;
    this.likesArr = likesArr;
    this.likesQuantity = likesArr.length;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    this.myIdOnServer = myIdOnServer;
  }

  _cardContentNew() {
    const card = document.querySelector(".card-template").content.querySelector('.card').cloneNode(true);
    return card;
  }

  generateCard() {
    this._element = this._cardContentNew();

    this._element.querySelector('.card__photo').src = this.link;
    this._element.querySelector('.card__text').textContent = this.name;
    this._element.querySelector('.card__like-counter').textContent = this.likesQuantity;
    this._element.querySelector(".card__like").addEventListener('click', this.handleLikeClick);
    this._element.querySelector(".card__delete-button").addEventListener('click', this.handleDeleteClick);
    this._element.querySelector(".card__photo").addEventListener('click', () => this.handleCardClick(this.name, this.link));
    this._whoIsOwner();
    if ( this.isLiked() ) {this.like(); };

    return this._element;
  }

  _whoIsOwner() {
    if (this.ownerId !== this.myIdOnServer) { this._element.querySelector(".card__delete-button").remove() }
  }

  isLiked() {
    const hasMyLike = (element) => element._id === this.myIdOnServer;
    return this.likesArr.some(hasMyLike);
  }

  handleCounter(responseArr) {
    const likeCounter = this._element.querySelector('.card__like-counter')
    const likeButton = this._element.querySelector(".card__like")
    if (!this.isLiked()) {
      likeButton.classList.add('card__like_active'); likeCounter.textContent = String(parseInt(this.likesArr.length, 10) +1)
    }
    else {
      likeButton.classList.remove('card__like_active'); likeCounter.textContent = String(parseInt(this.likesArr.length, 10) -1)
    }
    this.likesArr = responseArr
   }

  like() {
    const likeButton = this._element.querySelector(".card__like")
    likeButton.classList.toggle('card__like_active');
  }

   deleteCard() {
     this._element.closest('.card').remove();
   }

}

export default Card
