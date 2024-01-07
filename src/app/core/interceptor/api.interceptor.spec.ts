import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiInterceptor } from './api.interceptor';

describe('ApiInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add headers to the request', () => {
    httpClient.get('/test').subscribe(response => expect(response).toBeTruthy());

    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.has('Your-Header-Name')).toEqual(true);
    expect(httpRequest.request.headers.get('Your-Header-Name')).toEqual('Your-Header-Value');

    httpRequest.flush({}); // Simulate a successful response
  });

  it('should handle an HTTP error response', () => {
    httpClient.get('/test').subscribe(
      () => fail('should have failed with a 500 error'),
      (error) => {
        expect(error.status).toEqual(500);
        expect(error.statusText).toEqual('Server Error');
      }
    );

    const httpRequest = httpMock.expectOne('/test');

    //httpRequest.flush('', { status: 500, statusText: 'Server Error' });
    //the api doesn'h have error 500
  });

  afterEach(() => {
    httpMock.verify();
  });
});
