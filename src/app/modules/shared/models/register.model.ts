export class RegisterModel {

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    mobile_no: string,
    username: string, 
    password: string
  ) {
    this._firstName = first_name;
    this._lastName = last_name;
    this._email = email;
    this._mobileNo = mobile_no;
    this._username = username;
    this._password = password;
  }

  private _firstName: string;

  private _lastName: string;
  
  private _email: string;

  private _mobileNo: string;

  private _username: string;

  private _password: string;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get mobileNo(): string {
    return this._mobileNo;
  }

  set mobileNo(value: string) {
    this._mobileNo = value;
  }

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
