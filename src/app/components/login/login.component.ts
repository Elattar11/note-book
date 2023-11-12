import { Component } from '@angular/core';
import {FormGroup , FormControl , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  loginForm:FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required , Validators.email ]),
    password : new FormControl('',[Validators.required  ]),
  })


  logIn():void
  {
    this._AuthService.login(this.loginForm.value).subscribe({
      next : (res) =>
      {
        if(res.msg == 'done')
        {
          this._Router.navigate(['/home']);
          localStorage.setItem('token' , res.token);
          
          this._AuthService.setUserData();
        }else
        {
          alert(res.msg);
        }
      },
      error : (err) =>
      {
        alert(err.error.msg);
      }
    })
  }

}
