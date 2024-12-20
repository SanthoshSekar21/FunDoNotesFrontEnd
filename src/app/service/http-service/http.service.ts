import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http:HttpClient) { }
  loginApiCall(endpoint:String,data:any){
    return this.http.post('http://localhost:3000'+endpoint,data)
  }
  registerApiCall(endpoint:String,data:any){
    return this.http.post('http://localhost:3000'+endpoint,data)
  }
 
  createNoteApiCall(endpoint:string,data:any,header:any):Observable<any>{
    return this.http.post('http://localhost:3000'+endpoint,data,header)
  }
  getAllNotesApiCall(endpoint: string, header: any): Observable<any> {
    return this.http.get('http://localhost:3000'+endpoint, header);
}
updateNoteApiCall(endpoint: string,data:any,header:any):Observable<any> {
  return this.http.put('http://localhost:3000'+endpoint,data,header);
}
  archiveNoteApiCall(endpoint:string,header:any):Observable<any> {
    return this.http.put('http://localhost:3000'+endpoint,null,header);
  }
  
  trashNoteApiCall(endpoint:string,header:any):Observable<any>{
    return this.http.put('http://localhost:3000'+endpoint,null,header);
  }
  deleteNoteApiCall(endpoint:string,header:any):Observable<any>{
    return this.http.delete('http://localhost:3000'+endpoint,header);
  }
}
