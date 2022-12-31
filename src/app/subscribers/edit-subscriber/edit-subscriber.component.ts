import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscribersService } from '../service/subscribers.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-subscriber',
  templateUrl: './edit-subscriber.component.html',
  styleUrls: ['./edit-subscriber.component.css']
})
export class EditSubscriberComponent implements OnInit {

  public loading = false;

  saved:boolean = false;
  subscriber:any = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private subscribersService: SubscribersService,
    public snackBar: MatSnackBar,
    private location: Location) { 
      route.params.subscribe(
        (param) =>{
          this.getSubscriber(param['id']);
        }
      )
    }

  ngOnInit(): void {
  }

  getSubscriber(id: any){
    this.subscribersService.getSubscriber(id).subscribe(
      (data) =>{
        this.subscriber = data
      }
    )
  }

  updateSubscriber(){
    if (this.subscriber.Id == null) {
      this.subscribersService.updateSubscriber(this.subscriber).subscribe(
        (data) => {
          console.log(data);
          this.snackBar.open('Subscriber successfully update.', '', {
            duration: 5000,
            panelClass: 'complet',
            horizontalPosition: 'right'
          });
          this.router.navigate(['/app/subscribers']);
        }
      )
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

  returnBack(){
    this.location.back();
  }
}
