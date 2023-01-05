import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.css']
})
export class ListSubscribersComponent implements OnInit {

  public loading = false;

  subscribers:any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'SystemId', 'Area', 'PublicId', 'CountryCode', 'CountryName',
    'Name', 'Email', 'JobTitle', 'PhoneNumber', 'PhoneCode',
    'PhoneCodeAndNumber', 'LastActivityUtc', 'LasActivity', 
    'SubscriptionDate', 'SubscriptionMethod', 'SubscriptionState',
    'SubscriptionStateDescription', 'Topics', 'Activity',
    'ConnectionState', 'Id', 'accion1', 'accion2', 'accion3'
  ]

  BaseUrl = environment.BaseUrl;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private subscribersService: SubscribersService,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.getSubscribers();
  }

  getSubscribers(){
    this.subscribersService.getSubscribers().subscribe(
      (data) => {
        this.subscribers = data
        this.dataSource = new MatTableDataSource(this.subscribers.Data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.subscribers.Count);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 25;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSubscriber(id: any){
    if (id != null) {
      if (confirm("\n\nAre you sure you want to delete this subscriber\n\n")) {
        this.loading = true 
        this.subscribersService.deleteSubscriber(id).subscribe(
          (data) =>{
            this.snackBar.open('Subscriber successfully deleted.', '', {
              duration: 5000,
              panelClass: 'completed',
              horizontalPosition: 'right'
            })
            this.loading = false
            this.router.navigate(['/app/subscribers']);
          },
          (error) => {
            this.loading = false
            this.snackBar.open(error.message, '', {
              duration: 4000,
              panelClass: 'error',
              horizontalPosition: 'right'
            });
          }
        )
      }
    }
  }
  
}
