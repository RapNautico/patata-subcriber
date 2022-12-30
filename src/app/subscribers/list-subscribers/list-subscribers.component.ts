import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../service/subscribers.service';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.css']
})
export class ListSubscribersComponent implements OnInit {

  subscribers:any = [];

  constructor( private subscribersService: SubscribersService) { }

  ngOnInit() {
    this.getSubscribers();
  }

  getSubscribers(){
    this.subscribersService.getSubscribers().subscribe(
      (data) => {
        this.subscribers = data
        console.log(data);
        
      }
    )
  }

}
