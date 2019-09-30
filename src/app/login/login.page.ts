import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string;
  private password: string;

  constructor(private router:Router, private auth: AuthenticationService) { }

  logarUsuario(){
    
    this.auth.login(this.email,this.password)
    .then(() => {
      this.router.navigate(['tabs/books']);
    })
    .catch(error => {
      console.log(error);
      alert('O e-mail ou senha inseridos estão incorretos ou não existem.');
    });
  }
  ngOnInit() {
  }

}
