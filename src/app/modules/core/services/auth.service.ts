import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {TokenService} from "./token.service";
import {catchError, mergeMap, tap} from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {CipherService} from "./cipher.service";
import { HttpEncoderService } from "./http-encoder.service";
import { LoginModel } from "../../shared/models/login.model";
import { RegisterModel } from "../../shared/models/register.model";
import { VerifyRegistrationModel } from "../../shared/models/verify-registration.model";

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

  getOauth(username: string, password: string, headers: object): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams({ encoder: new HttpEncoderService() })
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')

    return this.http.post<any>(API_URL+ 'oauth/token', body, headers)
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

  login(loginModel: LoginModel): Observable<any> {
    const body = {
      'username': this.cipherService.encrypt(loginModel.username),
      'password': this.cipherService.encrypt(loginModel.password)
    };

    const bearer = this.getOauth(body.username, body.password, HTTP_OPTIONS);

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/login', body, {})
        .pipe(tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }), catchError(AuthService.handleError)
        );
    }));
  }

  register(registerModel: RegisterModel): Observable<any> {
    const body = {
      'first_name': this.cipherService.encrypt(registerModel.firstName),
      'last_name': this.cipherService.encrypt(registerModel.lastName),
      'mobile_no': this.cipherService.encrypt(registerModel.mobileNo),
      'email': this.cipherService.encrypt(registerModel.email),
      'username': this.cipherService.encrypt(registerModel.username),
      'password': this.cipherService.encrypt(registerModel.password)
    };

    const bearer = this.getOauth(GENERIC_USERNAME, GENERIC_PASSWORD, HTTP_OPTIONS);

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/register', body, {})
        .pipe(tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }), catchError(AuthService.handleError)
        );
    }));
  }

  verify(verifyRegistrationModel: VerifyRegistrationModel): Observable<any> {
    const body = {
      email: this.cipherService.encrypt(verifyRegistrationModel.email),
      token: this.cipherService.encrypt(verifyRegistrationModel.token)
    };

    const bearer = this.getOauth(GENERIC_USERNAME, GENERIC_PASSWORD, HTTP_OPTIONS);

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/verify', body, {})
        .pipe(tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }), catchError(AuthService.handleError)
        );
    }));
  }

  resendVerificationEmail(email: string): Observable<any> {
    const bearer = this.getOauth(GENERIC_USERNAME, GENERIC_PASSWORD, HTTP_OPTIONS);

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/verify/token/generate', {
        email: this.cipherService.encrypt(email)
      }, {})
        .pipe(tap(res => {
          
        }), catchError(AuthService.handleError)
        );
    }));
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }
}
