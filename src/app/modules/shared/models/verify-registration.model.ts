export class VerifyRegistrationModel {

  constructor(
    email: string,
    token: string,
  ) {
    this._email = email;
    this._token = token;
  }
  
  private _email: string;

  private _token: string;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
