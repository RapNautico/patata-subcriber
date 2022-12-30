import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any = {};

  hide = true;
  loginForm = new FormGroup({
    UserName: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z][a-z0-9_]*$/)]),
    Password: new FormControl(null, [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.get('UserName')?.value, this.loginForm.get('Password')?.value)
      .subscribe((res: any) =>{
        localStorage.setItem('token', res.Token);
        this.router.navigate(['/app']);
      })
  }
}
