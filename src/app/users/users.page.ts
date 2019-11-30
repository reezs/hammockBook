import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { DBService } from '../services/db.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  userOk: User;
  
  constructor(private authentication: AuthenticationService, private dbService: DBService ) { 
    this.getUser();
  }

  ngOnInit() {
  }

  async getUser(){
    this.userOk = await this.authentication.loggedInUser()
  }


}
