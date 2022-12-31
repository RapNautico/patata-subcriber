import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-save-subscribers',
  templateUrl: './save-subscribers.component.html',
  styleUrls: ['./save-subscribers.component.css']
})
export class SaveSubscribersComponent implements OnInit {

  formName:string = "";
  saved:boolean = false;
  subscriber:any = [];
  subscribers:any = [];
  subscribersDelete:any = [];

  subsForm = new FormGroup({
    Name:  new FormControl(null, [Validators.required]),
    Email:  new FormControl(null, [Validators.required, Validators.email]),
    CountryCode: new FormControl(null, [Validators.required]),
    PhoneNumber: new FormControl(null, [Validators.required]),
    JobTitle:  new FormControl(null, [Validators.required]),
    Area: new FormControl(null, [Validators.required]),
    Topics: new FormControl(null, [Validators.required])
  })


  constructor(private router: Router,
    private route: ActivatedRoute,
    private subscribersService: SubscribersService,
    public snackBar: MatSnackBar,
    private location: Location) {}

  ngOnInit(): void {
    this.getSubcribers();
  }

  setSubscriber(){
    this.subscribers.push({});
  }

  getSubscriber(id: any){
    this.subscribersService.getSubscriber(id).subscribe(
      (data) => {
        this.subscriber = data;
        this.subscribers = this.subscriber.subscribers
        if (this.subscribers.length == 0) {
          this.setSubscriber();
        }
      }
    )
  }

  getSubcribers(){
    this.subscribersService.getSubscribers().subscribe(
      (data) => {
        this.subscriber = data
      }
    )
  }

  createSubscriber(){
    if (this.subscriber.Id == null) {
      this.subscribersService.createSubscriber(this.subscriber).subscribe(
        (data) => {
          console.log(data);
          this.snackBar.open('Subscriber successfully created.', '', {
            duration: 5000,
            panelClass: 'completo',
            horizontalPosition: 'right'
          });
          this.router.navigate(['/app/subscribers']);
        }
      )
    }
  }

  deleteSubscriber(subscribers: any){
    if (this.subscribers.length > 1) {
      var i = this.subscribers.indexOf(subscribers);
      if (i !== 1) {
        this.subscribers.splice(i, 1);
      }
      if (subscribers.Id != null) {
        this.subscribersDelete.push(subscribers.Id);
      }
    }
  }

  returnBack(){
    this.location.back();
  }

}
