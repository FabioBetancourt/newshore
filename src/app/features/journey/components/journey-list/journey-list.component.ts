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

  constructor(private flightService: FlightService) {}

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
}
