import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { ListCountriesComponent } from './list-countries/list-countries.component';
import { CountriesService } from './service/countries.service';


@NgModule({
  declarations: [
    CountriesComponent,
    ListCountriesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule
  ],
  providers: [
    CountriesService
  ]
})
export class CountriesModule { }
