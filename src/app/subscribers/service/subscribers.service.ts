import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subscriber } from '../interface/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  publicIdCounter = 418;

  BaseUrl = environment.BaseUrl;

  constructor( private http: HttpClient) { }

  getSubscribers(){
    return this.http.get(`${this.BaseUrl}subscribers/`)
  }

  getSubscriber(id: any){
    return this.http.get(`${this.BaseUrl}subscribers/${id}`);
  }

  createSubscriber(subscribers: {Subscribers: Subscriber[]}){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }),
    };
    return this.http.post<any>(`${this.BaseUrl}subscribers/`, subscribers, httpOptions);
  }

  updateSubscriber(subscriber: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const subscribe = JSON.stringify(subscriber)
    console.log(subscriber);
    return this.http.put<any>(`${this.BaseUrl}subscribers/${subscriber.Id}`, subscribe, httpOptions);
  }

  deleteSubscriber(id: any){
    return this.http.delete<any>(`${this.BaseUrl}subscribers/${id}`);
  }
}
