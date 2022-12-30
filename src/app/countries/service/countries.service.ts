import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  BaseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get(`${this.BaseUrl}countries/`);
  }
}
