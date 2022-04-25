import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { catchError, mergeMap, tap } from "rxjs/operators";
import { LoginModel } from "../../shared/models/login.model";
import { RegisterModel } from "../../shared/models/register.model";
import { environment } from "../../../../environments/environment";
import { CipherService } from "./cipher.service";
import { AuthService } from "./auth.service";
import { VerifyRegistrationModel } from "../../shared/models/verify-registration.model";

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  redirectUrl = '';
  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
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
    private http: HttpClient, private tokenService: TokenService,
    private cipherService: CipherService, private authService: AuthService) { }

  login(loginModel: LoginModel): Observable<any> {
    const body = {
      'username': this.cipherService.encrypt(loginModel.username),
      'password': this.cipherService.encrypt(loginModel.password)
    };

    const bearer = this.authService.guestToken();

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/login', body, {})
        .pipe(tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }), catchError(LoginService.handleError)
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

    const bearer = this.authService.guestToken();

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/register', body, {})
        .pipe(tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }), catchError(LoginService.handleError)
        );
    }));
  }

  verify(verifyRegistrationModel: VerifyRegistrationModel): Observable<any> {
    const body = {
      email: this.cipherService.encrypt(verifyRegistrationModel.email),
      token: this.cipherService.encrypt(verifyRegistrationModel.token)
    };

    const bearer = this.authService.guestToken();

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/verify', body, {})
        .pipe(tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveTokenType(res.token_type);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }), catchError(LoginService.handleError)
        );
    }));
  }

  resendVerificationEmail(email: string): Observable<any> {
    const bearer = this.authService.guestToken();

    return bearer.pipe(mergeMap(res => {
      return this.http.post<any>(API_URL + 'api/client/verify/token/generate', {
        email: this.cipherService.encrypt(email)
      }, {})
        .pipe(tap(res => {
          
        }), catchError(LoginService.handleError)
        );
    }));
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }
}
