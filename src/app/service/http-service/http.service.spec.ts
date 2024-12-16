import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call loginApiCall and return expected response', () => {
    const endpoint = '/login';
    const data = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'jwt-token' };

    service.loginApiCall(endpoint, data).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(mockResponse);
  });

  it('should call registerApiCall and return expected response', () => {
    const endpoint = '/register';
    const data = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { message: 'User registered successfully' };

    service.registerApiCall(endpoint, data).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(mockResponse);
  });

  it('should call createNoteApiCall and return expected response', () => {
    const endpoint = '/notes';
    const data = { title: 'Test Note', description: 'Test Description' };
    const header = { headers: { Authorization: 'Bearer jwt-token' } };
    const mockResponse = { message: 'Note created successfully' };

    service.createNoteApiCall(endpoint, data, header).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush(mockResponse);
  });

  it('should call getAllNotesApiCall and return expected response', () => {
    const endpoint = '/notes';
    const header = { headers: { Authorization: 'Bearer jwt-token' } };
    const mockResponse = [{ id: 1, title: 'Test Note' }];

    service.getAllNotesApiCall(endpoint, header).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush(mockResponse);
  });

  it('should call updateNoteApiCall and return expected response', () => {
    const endpoint = '/notes/1';
    const data = { title: 'Updated Note', description: 'Updated Description' };
    const header = { headers: { Authorization: 'Bearer jwt-token' } };
    const mockResponse = { message: 'Note updated successfully' };

    service.updateNoteApiCall(endpoint, data, header).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush(mockResponse);
  });

  it('should call archiveNoteApiCall and return expected response', () => {
    const endpoint = '/notes/1/archive';
    const header = { headers: { Authorization: 'Bearer jwt-token' } };
    const mockResponse = { message: 'Note archived successfully' };

    service.archiveNoteApiCall(endpoint, header).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeNull();
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush(mockResponse);
  });

  it('should call trashNoteApiCall and return expected response', () => {
    const endpoint = '/notes/1/trash';
    const header = { headers: { Authorization: 'Bearer jwt-token' } };
    const mockResponse = { message: 'Note trashed successfully' };

    service.trashNoteApiCall(endpoint, header).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeNull();
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush(mockResponse);
  });

  it('should call deleteNoteApiCall and return expected response', () => {
    const endpoint = '/notes/1';
    const header = { headers: { Authorization: 'Bearer jwt-token' } };
    const mockResponse = { message: 'Note deleted successfully' };

    service.deleteNoteApiCall(endpoint, header).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush(mockResponse);
  });
});
