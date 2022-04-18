export class LoginModel {

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  private _username: string;

  private _password: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

}
