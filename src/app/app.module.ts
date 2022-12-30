import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { CountriesComponent } from './countries/countries.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { CountriesService } from './countries/service/countries.service';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthGuard } from './auth/guard/auth.guard';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export function jwtOptionsFactory(router: Router) {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    skipWhenExpired: true,
    headerName: 'Authorization',
    authScheme: 'Bearer',
    throwNoTokenError: true,
    skipWhenNotIdentityToken: false
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    DashboardComponent,
    CountriesComponent,
    SubscribersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutRoutingModule,
    AuthRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Router]
      }
    })
  ],
  providers: [
    AuthGuard,
    CountriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
