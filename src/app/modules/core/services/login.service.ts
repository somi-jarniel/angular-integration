import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {TokenService} from "./token.service";
import {catchError, tap} from "rxjs/operators";
import {LoginModel} from "../../shared/models/login.model";
import { RegisterModel } from "../../shared/models/register.model";
import { environment } from "../../../../environments/environment";
import {CipherService} from "./cipher.service";
import { AuthService } from "./auth.service";

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  constructor(
    private http:HttpClient, private tokenService:TokenService, 
    private cipherService: CipherService, private authService:AuthService) {}

  login(loginModel: LoginModel): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    // attempt to get bearer token here
    const body = new HttpParams()
      .set('username', this.cipherService.encrypt(loginModel.username))
      .set('password', this.cipherService.encrypt(loginModel.password));

    return this.http.post<any>(API_URL+ 'api/client/login', body, {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded'
      })
    })
      .pipe(tap(res=>{
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),catchError(LoginService.handleError)
      );
  }

  register(registerModel: RegisterModel): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('fisrt_name', this.cipherService.encrypt(registerModel.firstName))
      .set('last_name', this.cipherService.encrypt(registerModel.lastName))
      .set('mobile_no', this.cipherService.encrypt(registerModel.mobileNo))
      .set('email', this.cipherService.encrypt(registerModel.email))
      .set('username', this.cipherService.encrypt(registerModel.username))
      .set('password', this.cipherService.encrypt(registerModel.password));

    return this.http.post<any>(API_URL+ 'api/client/register', body, {})
      .pipe(tap(res=>{
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),catchError(LoginService.handleError)
      );
  }
}
