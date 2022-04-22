import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {TokenService} from "./token.service";
import {catchError, tap} from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {CipherService} from "./cipher.service";
import { HttpEncoderService } from "./http-encoder.service";

const GENERIC_USERNAME = environment.genericUsername;
const GENERIC_PASSWORD = environment.genericPassword;
const OAUTH_CLIENT = environment.clientId;
const OAUTH_SECRET = environment.clientSecret;
const API_URL = environment.apiURL;

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Authorization':  'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET)
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';
  private static handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}`, `body was: ${error.error}`);
    }
    return throwError('Something bad happened: please try again later.');
  }

  private static log(message: string): any {
    console.log(message);
  }

  constructor(private http:HttpClient, private tokenService:TokenService, private cipherService: CipherService) {}

  guestToken(): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams({ encoder: new HttpEncoderService() })
      .set('username', GENERIC_USERNAME)
      .set('password', GENERIC_PASSWORD)
      .set('grant_type', 'password')

    return this.http.post<any>(API_URL+ 'oauth/token', body, HTTP_OPTIONS)
      .pipe(tap(res=>{
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token')

    return this.http.post<any>(API_URL+ 'oauth/token', body, HTTP_OPTIONS)
      .pipe(tap(res=>{
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }
}
