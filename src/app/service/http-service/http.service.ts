import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http:HttpClient) { }
  loginApiCall(endpoint:String,data:any){
    console.log(data);
    return this.http.post('http://localhost:3000/api/v1/users/login',data)
  }
}
