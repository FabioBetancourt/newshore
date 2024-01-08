import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest = req.clone({
      headers: req.headers.set('Your-Header-Name', 'Your-Header-Value')
    });

    return next.handle(clonedRequest).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('Intercepting response');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error from api interceptor', error);
        if (error.status === 500) {

          console.error('An error 500 occurred', error.message);
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
