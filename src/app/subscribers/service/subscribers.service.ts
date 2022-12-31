import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscriber } from '../interface/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  BaseUrl = environment.BaseUrl;

  constructor( private http: HttpClient) { }

  getSubscribers(){
    return this.http.get(`${this.BaseUrl}subscribers/`)
  }

  getSubscriber(id: any){
    return this.http.get(`${this.BaseUrl}subscribers/${id}`);
  }

  createSubscriber(subscriber: any){
      const formData: FormData = new FormData();
      if (subscriber.Name != null) {
        formData.append('subscriber[Name]', subscriber.Name)
      }
      if (subscriber.Email != null) {
        formData.append('subscriber[Email]', subscriber.Email)
      }
      if (subscriber.CountryCode != null) {
        formData.append('subscriber[CountryCode]', subscriber.CountryCode)
      }
      if (subscriber.PhoneNumber != null) {
        formData.append('subscriber[PhoneNumber]', subscriber.PhoneNumber)
      }
      if (subscriber.JobTitle != null) {
        formData.append('subscriber[JobTitle]', subscriber.JobTitle)
      }
      if (subscriber.Area != null) {
        formData.append('subscriber[Area]', subscriber.Area)
      }
      if (subscriber.Topics != null) {
        formData.append('subscriber[Topics]', subscriber.Topics)
      }
      return this.http.post(`${this.BaseUrl}subscribers/`, formData);
  }

  updateSubscriber(subscriber: any){
    const formData: FormData = new FormData();
    if (subscriber.Name != null) {
      formData.append('subscriber[Name]', subscriber.Name)
    }
    if (subscriber.Email != null) {
      formData.append('subscriber[Email]', subscriber.Email)
    }
    if (subscriber.CountryCode != null) {
      formData.append('subscriber[CountryCode]', subscriber.CountryCode)
    }
    if (subscriber.PhoneNumber != null) {
      formData.append('subscriber[PhoneNumber]', subscriber.PhoneNumber)
    }
    if (subscriber.JobTitle != null) {
      formData.append('subscriber[JobTitle]', subscriber.JobTitle)
    }
    if (subscriber.Area != null) {
      formData.append('subscriber[Area]', subscriber.Area)
    }
    if (subscriber.Topics != null) {
      formData.append('subscriber[Topics]', subscriber.Topics)
    }
    return this.http.put<any>(`${this.BaseUrl}subscribers/${subscriber.id}`, formData);
  }

  deleteSubscriber(id: any){
    return this.http.delete<any>(`${this.BaseUrl}subscribers/${id}`);
  }
}
