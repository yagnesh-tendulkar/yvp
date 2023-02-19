import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ThanksComponent } from './components/thanks/thanks.component';
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    pathMatch: 'full',
    path: '',
    component: UserManagementComponent,

  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'successfull',
    component: ThanksComponent
  },
  {
    path: 'users',
    component: UserManagementComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
