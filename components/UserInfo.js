export default class UserInfo {
  constructor({name, description, avatar}) {
    this._name = name;
    this._description = description;
    this._avatar = avatar
  }

  getUserInfo() {
    const userInfo = {
      name: this._name,
      description: this._description,
      avatar: this._avatar,
    };
    return userInfo;
  }

  setUserInfo ( {nameInput, descriptionInput, avatar} ) {
    this._name = nameInput;
    this._description = descriptionInput;
    this._avatar = avatar;
  }
}
