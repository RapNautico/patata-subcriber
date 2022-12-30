import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersComponent } from './subscribers.component';

const routes: Routes = [
  { 
    path: 'subscribers',
    component: SubscribersComponent,
    children: [
      { path: '', component: SubscribersComponent},
      { path: 'new', component: SubscribersComponent},
      { path: ':id', component: SubscribersComponent},
      { path: ':id/edit', component: SubscribersComponent},
      { path: '**', redirectTo: 'subscribers'},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
