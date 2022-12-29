import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SubscribersComponent } from './subscribers.component';
import { SaveSubscribersComponent } from './save-subscribers/save-subscribers.component';
import { ShowSubscribersComponent } from './show-subscribers/show-subscribers.component';
import { ListSubscribersComponent } from './list-subscribers/list-subscribers.component';


@NgModule({
  declarations: [
    SubscribersComponent,
    SaveSubscribersComponent,
    ShowSubscribersComponent,
    ListSubscribersComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule
  ]
})
export class SubscribersModule { }
