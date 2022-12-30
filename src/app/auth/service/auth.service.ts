import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BaseUrl = environment.BaseUrl;

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(UserName: string, Password: string){
    return this.http.post(`${this.BaseUrl}account/login`, {UserName, Password});
  }

  getUserData(): Observable<any>{
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get<any>(`${this.BaseUrl}account/login`, httpOptions);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    localStorage.removeItem('token');
  }
}
