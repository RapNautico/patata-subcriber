import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  BaseUrl = environment.BaseUrl;

  constructor( private http: HttpClient) { }

  getSubscribers(){
    return this.http.get(`${this.BaseUrl}subscribers/`)
  }

}
