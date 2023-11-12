import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/services/auth/guards/auth.guard';

const routes: Routes = [
{path:'' , redirectTo:'home',pathMatch:'full'},
{path:'home' , canActivate:[authGuard],  component:HomeComponent , title:'home'},
{path:'login' , component:LoginComponent , title:'Login'},
{path:'signup' , component:SignupComponent , title:'Signup'},
{path:'**' , component:NotfoundComponent , title:'Notfound'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
