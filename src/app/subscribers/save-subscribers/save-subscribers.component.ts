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
    Topics: new FormControl([]),
    Activity: new FormControl('--'),
    EndpointsCount: new FormControl(0),
    LastActivity: new FormControl(null),
    LastActivityString: new FormControl(null),
    LastActivityUtc: new FormControl(null),
    PhoneCode: new FormControl("57"),
    PhoneCodeAndNumber: new FormControl("(57)"),
    SubscriptionDate: new FormControl(null),
    SubscriptionMethod: new FormControl(0),
    SubscriptionState: new FormControl(0),
    SubscriptionStateDescription: new FormControl("Pendiente"),
    SystemId: new FormControl(null),
    PublicId: new FormControl(null),
    Id: new FormControl(null),
    ValidEmail: new FormControl(true),
    ConnectionState: new FormControl(2),
    CountryName: new FormControl("Colombia"),
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
    const subscriber = {
      Name: this.subsForm.get('Name')?.value,
      Email: this.subsForm.get('Email')?.value,
      CountryCode: this.subsForm.get('CountryCode')?.value,
      PhoneNumber: this.subsForm.get('PhoneNumber')?.value,
      JobTitle: this.subsForm.get('JobTitle')?.value,
      Area: this.subsForm.get('Area')?.value,
      Topics: this.subsForm.get('Topics')?.value,
      Activity: this.subsForm.get('Activity')?.value,
      EndpointsCount: this.subsForm.get('EndpointsCount')?.value,
      LastActivity: this.subsForm.get('LastActivity')?.value,
      LastActivityString: this.subsForm.get('LastActivityString')?.value,
      LastActivityUtc: this.subsForm.get('LastActivityUtc')?.value,
      PhoneCode: this.subsForm.get('PhoneCode')?.value,
      PhoneCodeAndNumber: this.subsForm.get('PhoneCodeAndNumber')?.value,
      SubscriptionDate: this.subsForm.get('SubscriptionDate')?.value,
      SubscriptionMethod: this.subsForm.get('SubscriptionMethod')?.value,
      SubscriptionState: this.subsForm.get('SubscriptionState')?.value,
      SubscriptionStateDescription: this.subsForm.get('SubscriptionStateDescription')?.value,
      SystemId: this.subsForm.get('SystemId')?.value,
      PublicId: this.subsForm.get('PublicId')?.value,
      Id: this.subsForm.get('Id')?.value,
      ValidEmail: this.subsForm.get('ValidEmail')?.value,
      ConnectionState: this.subsForm.get('ConnectionState')?.value,
      CountryName: this.subsForm.get('CountryName')?.value
    }
    if (this.subscriber.Data.Id == null) {
      this.subscribersService.createSubscriber(subscriber).subscribe(
        (data) => {
          console.log('vamosss',data);
          this.snackBar.open('Subscriber successfully created.', '', {
            duration: 5000,
            panelClass: 'completo',
            horizontalPosition: 'right'
          });
          this.subscriber.Data = data
          // this.router.navigate(['/app/subscribers']);
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
