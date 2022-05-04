import {Injectable} from "@angular/core";

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const TOKEN_TYPE = 'token_type';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  saveTokenType(token_type: string): void {
    localStorage.setItem(TOKEN_TYPE, token_type);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }


}
