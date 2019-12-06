import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string;
  private password: string;
  loading;

  constructor(private router: Router, private auth: AuthenticationService, private loadingController: LoadingController) { }

  async hideLoading() {
    this.loading.dismiss();
   }

   async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await this.loading.present();

  }

  async logarUsuario(){
    await this.presentLoading();
    
    this.auth.login(this.email,this.password)
    .then(() => {
      this.router.navigate(['tabs/books']);
    })
    .catch(error => {
      console.log(error);
      alert('O e-mail ou senha inseridos estão incorretos ou não existem.');
    });
    await this.hideLoading();
    delete this.email;
    delete this.password;
  }
  redefinirSenha(){
    this.router.navigate(["/reset-password"]);
  }
  ngOnInit() {
  }

}
