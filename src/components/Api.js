class Api {
  constructor(BaseUrl, token) {
    this.BaseUrl = BaseUrl;
    this.token = token;
  }
//working
  getCards() {
    return fetch(`${this.BaseUrl}cards`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()}
        else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }
//working
  getUserInfo() {
    return fetch(`${this.BaseUrl}users/me`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()}
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }
//working
  setUserInfo(name, about) {
    return fetch(`${this.BaseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()}
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }
//working
  addNewCard(name, link) {
    return fetch(`${this.BaseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()}
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }
  //working
  deleteMyCard(cardId) {
    return fetch(`${this.BaseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()}
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  putLike(cardId) {
    return fetch(`${this.BaseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()}
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  deleteLike(cardId) {
    return fetch(`${this.BaseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()}
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  updateAvatar(link) {
    return fetch(`${this.BaseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()}
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

}

export default Api;
