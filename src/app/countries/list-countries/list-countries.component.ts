import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { CountriesService } from '../service/countries.service';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  countries:any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Code', 'Name', 'PhoneCode'];

  BaseUrl = environment.BaseUrl;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor( 
    private countriesService: CountriesService,
    private http: HttpClient
    ) { }
    
    ngOnInit(){
      this.getCountries();
    }
    
    getCountries(){
      this.countriesService.getCountries().subscribe(
        (data) =>{
          this.countries = data;
          this.dataSource = new MatTableDataSource(this.countries.Data);
          this.dataSource.sort = this.sort;
        }
        )
      }
      
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.countries.Count);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  OnPageChange(event: PageEvent){
    this.http.get(`${this.BaseUrl}countries?page=${event.pageIndex}&size=${event.pageSize}`)
    .subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.Data); 
    });
  }
  
}
