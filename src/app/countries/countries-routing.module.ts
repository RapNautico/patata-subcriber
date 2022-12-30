import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries.component';
import { ListCountriesComponent } from './list-countries/list-countries.component';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesComponent,
    children: [
      { path: '', component: CountriesComponent},
      { path: '**', redirectTo: 'countries'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
