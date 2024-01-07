import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { Flight } from 'src/app/shared/models/flight.model';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private cache: any = {};

  constructor(private http: HttpClient) {}

  getFlights(routeId: number): Observable<Flight[]> {
    const url = `https://recruiting-api.newshore.es/api/flights/${routeId}`;
    if (!this.cache[url]) {
      this.cache[url] = this.http.get<Flight[]>(url)
        .pipe(
          shareReplay(1),
          catchError(this.handleError)
        );
    }
    return this.cache[url];
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
