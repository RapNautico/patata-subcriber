import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-show-subscribers',
  templateUrl: './show-subscribers.component.html',
  styleUrls: ['./show-subscribers.component.css']
})
export class ShowSubscribersComponent implements OnInit {

  form_name:string = "";
  subscriber:any = [];
  save:boolean = false;

  constructor(private subscribersService: SubscribersService,
    private route: ActivatedRoute,
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
        console.log(data);
      }
    )
  }

  returnBack(){
    this.location.back();
  }
}
