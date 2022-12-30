import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { 
    path: 'auht',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'app', 
    component: LayoutComponent,
    canLoad: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
