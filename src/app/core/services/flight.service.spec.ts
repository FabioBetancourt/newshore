import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlightService } from './flight.service';
import { Flight } from 'src/app/shared/models/flight.model';

describe('FlightService', () => {
  let service: FlightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService]
    });
    service = TestBed.inject(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve flights from the API via GET', () => {
    const dummyFlights: Flight[] = [
      { departureStation: 'MDE', arrivalStation: 'BOG', flightCarrier: 'AV', flightNumber: '1234', price: 100 },
      { departureStation: 'BOG', arrivalStation: 'MDE', flightCarrier: 'AV', flightNumber: '5678', price: 100 }
    ];

    service.getFlights(1).subscribe(flights => {
      expect(flights.length).toBe(2);
      expect(flights).toEqual(dummyFlights);
    });

    const request = httpMock.expectOne(`https://recruiting-api.newshore.es/api/flights/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyFlights);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
