export default class UserInfo {
  constructor( {name, description} ) {
    this.name = name;
    this.description = description;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this.description.textContent,
    };
    return userInfo;
  }

  setUserInfo ( {userInfo} ) {
    this._name.textContent = userInfo.name;
    this._description.textContent = userInfo.description;
  }
}
