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
  selectedCurrency: string = 'USD';
  exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    COP: 4000,
  };
  numberOfFlights: number = 1;
  message: string = '';
  totalPrice: number = 0;


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
    this.message = '';

    this.flightService.getFlights(this.numberOfFlights).subscribe({
      next: allFlights => {
        this.journey = this.constructJourney(allFlights, this.origin, this.destination, this.numberOfFlights);
        if (!this.journey || this.journey.length === 0) {
          this.message = 'No se pudo construir una ruta con los datos proporcionados, intente con un numero mayor de vuelos';
        } else if (this.journey.length === 1 && this.numberOfFlights > 1) {
          this.message = 'Ruta directa encontrada, no se necesitan vuelos adicionales.';
        }
      },
      error: error => {
        this.message = 'Error al buscar vuelos: ' + error.message;
      }
    });
  }

private constructJourney(flights: Flight[], origin: string, destination: string, numberOfFlights: number): Flight[] | null {
  if (numberOfFlights === 1) {
    const directFlight = flights.find(f => f.departureStation === origin && f.arrivalStation === destination);
    return directFlight ? [directFlight] : null;
  }

  let currentOrigin = origin;
  let route: Flight[] = [];

  while (currentOrigin !== destination) {
    let flight = flights.find(f => f.departureStation === currentOrigin);
    if (!flight) {
      return null;
    }

    route.push(flight);
    currentOrigin = flight.arrivalStation;

    if (route.length >= numberOfFlights) {
      break; // Stop if the route has reached the specified number of flights
    }
  }
  this.totalPrice = route.reduce((sum, flight) => sum + flight.price, 0);

  return route.length && route[route.length - 1].arrivalStation === destination ? route : null;
}

  //is better call the api but for the time that i have no is possible
  convertPrice(price: number, targetCurrency: string): string {
    if (targetCurrency !== 'USD') {
      const conversionRate = this.exchangeRates[targetCurrency];
      price = price * conversionRate;
    }
    if (targetCurrency === 'COP') {
      return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    } else {
      return price.toFixed(2);
    }
  }
}



