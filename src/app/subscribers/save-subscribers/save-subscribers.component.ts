import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from '../interface/subscriber';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-save-subscribers',
  templateUrl: './save-subscribers.component.html',
  styleUrls: ['./save-subscribers.component.css']
})
export class SaveSubscribersComponent implements OnInit {

  public loading = false;

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
    JobTitle:  new FormControl(""),
    Area: new FormControl(""),
    Topics: new FormControl([])
  })


  constructor(private router: Router,
    private route: ActivatedRoute,
    private subscribersService: SubscribersService,
    public snackBar: MatSnackBar,
    private location: Location) {
      if (this.subscribers.length == 0) {
        this.setSubscriber();
      }
    }

  ngOnInit(): void {
    this.getSubscribers();
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

  getSubscribers(){
    this.subscribersService.getSubscribers().subscribe(
      (data) => {
        this.subscriber = data
      }
    )
  }

  createSubscriber(){
    const subscribers = {
      Subscribers: [
        {
          Name: this.subsForm.get('Name')?.value,
          Email: this.subsForm.get('Email')?.value,
          CountryCode: this.subsForm.get('CountryCode')?.value,
          PhoneNumber: this.subsForm.get('PhoneNumber')?.value,
          JobTitle: this.subsForm.get('JobTitle')?.value,
          Area: this.subsForm.get('Area')?.value,
          Topics: this.subsForm.get('Topics')?.value,
        }
      ]
    }
    if (this.subscriber.Data.Id == null) {
      this.loading = true
      this.subscribersService.createSubscriber(subscribers).subscribe(
        (data) => {
          this.snackBar.open('Subscriber successfully created.', '', {
            duration: 5000,
            panelClass: 'completo',
            horizontalPosition: 'right'
          });
          this.loading = false
          this.router.navigate(['/app/subscribers']);
          this.getSubscribers();
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
