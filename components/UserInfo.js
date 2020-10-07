export default class UserInfo {
  constructor({name, description}) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name,
      description: this._description,
    };
    return userInfo;
  }

  setUserInfo ( {nameInput, descriptionInput} ) {
    this._name = nameInput;
    this._description = descriptionInput;
  }
}
