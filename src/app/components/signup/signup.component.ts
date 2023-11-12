import { Component } from '@angular/core';
import {FormGroup , FormControl , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  signUpForm:FormGroup = new FormGroup({
    name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required , Validators.email ]),
    age : new FormControl('',[Validators.required  ]),
    phone : new FormControl('',[Validators.required  ]),
    password : new FormControl('',[Validators.required  ]),
  })


  signUp():void
  {
    this._AuthService.signUp(this.signUpForm.value).subscribe({
      next : (res) =>
      {
        if(res.msg == 'done')
        {
          this._Router.navigate(['/login']);
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
