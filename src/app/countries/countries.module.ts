import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { ListCountriesComponent } from './list-countries/list-countries.component';
import { CountriesService } from './service/countries.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    CountriesComponent,
    ListCountriesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MaterialModule
  ],
  providers: [
    CountriesService
  ]
})
export class CountriesModule { }
