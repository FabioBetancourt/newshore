import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JourneyListComponent } from './journey-list.component';
import { FlightService } from 'src/app/core/services/flight.service';
import { of } from 'rxjs';
import { Flight } from 'src/app/shared/models/flight.model';

describe('JourneyListComponent', () => {
  let component: JourneyListComponent;
  let fixture: ComponentFixture<JourneyListComponent>;
  let flightService: FlightService;

  const dummyFlights: Flight[] = [
    { departureStation: 'MDE', arrivalStation: 'BOG', flightCarrier: 'AV', flightNumber: '1234', price: 100 },
    { departureStation: 'BOG', arrivalStation: 'MDE', flightCarrier: 'AV', flightNumber: '5678', price: 100 }
  ];

  beforeEach(async () => {
    // Create a mock flightService with a getFlights() spy
    const flightServiceMock = jasmine.createSpyObj('FlightService', ['getFlights']);
    // Make the spy return a stream of dummy flight data
    flightServiceMock.getFlights.and.returnValue(of(dummyFlights));

    await TestBed.configureTestingModule({
      declarations: [ JourneyListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: FlightService, useValue: flightServiceMock }
      ]
    }).compileComponents();

    flightService = TestBed.inject(FlightService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call flightService.getFlights on init and get flights', () => {
    // Initialize the component. ngOnInit() will be called
    fixture.detectChanges();

    // Verify that the service was called
    expect(flightService.getFlights).toHaveBeenCalled();

    // Verify that component.flights is set to the mock flights
    expect(component.flights).toEqual(dummyFlights);
  });
});
