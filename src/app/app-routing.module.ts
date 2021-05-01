import { SignupComponent } from './components/signup/signup.component';
import { ShowUserComponent } from './components/show-user/show-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  {path:'',pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent },
  { path: 'signin/register/:id', component: RegisterComponent },
  { path: 'signin/register/:id/show/:id', component: ShowUserComponent },
  {path:'signin/signup',component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
