import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../service/countries.service';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  countries:any = [];

  constructor( 
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    localStorage.getItem('access_token')
    this.getCountries();
  }

  getCountries(){
    this.countriesService.getCountries().subscribe(
      (data) =>{
        this.countries = data
      }
    )
  }

}
