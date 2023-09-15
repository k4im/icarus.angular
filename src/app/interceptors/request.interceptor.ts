import { Injectable, NgModule } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, multicast } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone(
      {headers: request.headers.set('Authorization', 'Bearer ' + this.cookie.get("AccessToken"))}
    );
    return next.handle(request);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ]
})
export class Interceptor {}