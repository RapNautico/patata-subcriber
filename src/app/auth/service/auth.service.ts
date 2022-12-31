import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    localStorage.removeItem('token');
  }
}
