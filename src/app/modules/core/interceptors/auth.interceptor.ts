import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {TokenService} from "../services/token.service";
import {AuthService} from "../services/auth.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router:Router,
    private tokenService:TokenService,
    private authService:AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    if(!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map( (event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          console.log('event--->>', event)
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          if(error.error.error === 'invalid_token') {
            this.authService.refreshToken({refresh_token:refreshToken}).subscribe(
              ()=>{
                location.reload();
              }
            );
          } else {
            this.router.navigate(['login']).then(_ => console.log('redirected to login'));
          }
        }

        return throwError(error);
      })
    );
  }

}
