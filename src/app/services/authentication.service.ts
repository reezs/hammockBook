import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../entities/user';
import { DBService } from './db.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth, private dbService: DBService) { }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async loggedInUser() {
    return new Promise<User>((resolve, reject) => {
      this.afAuth.user
        .subscribe(async user => {
          const userFromDB = (await this.dbService.search<User>('usuarios', 'email', user.email))[0];

          resolve(userFromDB);
        });
    });
  }
  getUserAuth() {
    return this.afAuth.auth;
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  delete() {
    return this.afAuth.auth.currentUser.delete();
}

}
