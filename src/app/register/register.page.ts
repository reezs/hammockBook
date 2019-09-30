import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User;
  constructor(private router: Router,private dbService: DBService, private auth: AuthenticationService) {
    this.user = new User();
   }
  logarUsuario(){
    this.router.navigate(['tabs/books']);
  }
  async register() {
    await this.auth.register(this.user.email, this.user.password)
    .then(() => {
      this.logarUsuario();
    })
    .catch(error => {
      console.log(error);
      alert('Este e-mail já está em uso. Tente outro.');
    });

    
    await this.dbService.insertInList('usuarios', this.user);
    alert('Usuário foi cadastrado com sucesso.');

  }
  ngOnInit() {
  }

}
