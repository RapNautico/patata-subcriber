import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSubscribersComponent } from './list-subscribers/list-subscribers.component';
import { SaveSubscribersComponent } from './save-subscribers/save-subscribers.component';
import { ShowSubscribersComponent } from './show-subscribers/show-subscribers.component';
import { SubscribersComponent } from './subscribers.component';

const routes: Routes = [
  { 
    path: 'subscribers',
    component: SubscribersComponent,
    children: [
      { path: '', component: ListSubscribersComponent},
      { path: 'new', component: SaveSubscribersComponent},
      { path: ':id', component: ShowSubscribersComponent},
      { path: ':id/edit', component: SaveSubscribersComponent},
      { path: '**', redirectTo: 'subscribers'},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
