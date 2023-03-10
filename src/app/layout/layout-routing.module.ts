import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CountriesComponent } from '../countries/countries.component';
import { ListCountriesComponent } from '../countries/list-countries/list-countries.component';
import { EditSubscriberComponent } from '../subscribers/edit-subscriber/edit-subscriber.component';
import { ListSubscribersComponent } from '../subscribers/list-subscribers/list-subscribers.component';
import { SaveSubscribersComponent } from '../subscribers/save-subscribers/save-subscribers.component';
import { ShowSubscribersComponent } from '../subscribers/show-subscribers/show-subscribers.component';
import { SubscribersComponent } from '../subscribers/subscribers.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    canActivateChild: [ AuthGuard],
    children: [
      {
        path: 'subscribers',
        component: SubscribersComponent,
        children: [
          { path: '', component: ListSubscribersComponent},
          { path: 'new', component: SaveSubscribersComponent},
          { path: ':id', component: ShowSubscribersComponent},
          { path: ':id/edit', component: EditSubscriberComponent}
        ]
      },
      {
        path: 'countries',
        component: CountriesComponent,
        children: [
          { path: '', component: ListCountriesComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
