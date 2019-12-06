import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) { }

  resetPassword: boolean;
  email: string;

  ngOnInit() {
  }

  resetPasswordByEmail(){
    if(this.email){
      this.auth.sendResetPassword(this.email).then(() => {
        this.resetPassword = true;
      })
    }
    
  }

  back(){
    this.router.navigate['login'];
  }
}
