import { Component } from '@angular/core';
import { FlightService } from 'src/app/core/services/flight.service';
import { Flight } from 'src/app/shared/models/flight.model';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss']
})
export class JourneyListComponent {
  flights: Flight[] = [];
  origin: string = '';
  destination: string = '';
  journey: any;

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getFlights(2).subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        console.error('Error fetching flights', error);
      }
    );
  }

  findRoute(): void {
    this.flightService.getFlights(2).subscribe(
      allFlights => {
        this.journey = this.constructJourney(allFlights, this.origin, this.destination);
        if (!this.journey || this.journey.length === 0) {
          console.error('No se pudo construir una ruta con los datos proporcionados.');
        }
      },
      error => {
        console.error('Error al buscar vuelos', error);
      }
    );
  }
  private constructJourney(flights: Flight[], origin: string, destination: string): Flight[] | null {
    let currentOrigin = origin;
    let route: Flight[] = [];

    while (currentOrigin !== destination) {
      let flight = flights.find(f => f.departureStation === currentOrigin);
      if (!flight) {
        return null;
      }
      route.push(flight);
      currentOrigin = flight.arrivalStation;
    }

    return route;
  }
}


