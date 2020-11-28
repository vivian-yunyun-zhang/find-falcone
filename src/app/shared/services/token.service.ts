import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private baseUrl="https://findfalcone.herokuapp.com/token";

  constructor(private http:HttpClient) {
    
   }

  getToken(){
    const headers = { 'Accept': 'application/json' };
       return this.http.post<any>(this.baseUrl,{},{headers}).pipe(map(response=>response));
  }
}
