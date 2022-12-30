import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.css']
})
export class ListSubscribersComponent implements OnInit {

  subscribers:any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'SystemId', 'Area', 'PublicId', 'CountryCode', 'CountryName',
    'Name', 'Email', 'JobTitle', 'PhoneNumber', 'PhoneCode',
    'PhoneCodeAndNumber', 'LastActivityUtc', 'LasActivity', 
    'SubscriptionDate', 'SubscriptionMethod', 'SubscriptionState',
    'SubscriptionStateDescription', 'Topics', 'Activity',
    'ConnectionState', 'Id'
  ]

  BaseUrl = environment.BaseUrl;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private subscribersService: SubscribersService,
              private http: HttpClient) { }

  ngOnInit() {
    this.getSubscribers();
  }

  getSubscribers(){
    this.subscribersService.getSubscribers().subscribe(
      (data) => {
        this.subscribers = data
        this.dataSource = new MatTableDataSource(this.subscribers.Data)
        console.log(data);
        
      }
    )
  }

  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.subscribers.Count);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
