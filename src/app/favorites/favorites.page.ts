import { Component, OnInit } from '@angular/core';
import { Book } from '../entities/book';
import { User } from '../entities/user';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  books: Book[];
  userOk: User;
  constructor() { }

  booksFavoritos(){
    
  }
  ngOnInit() {
  }

}
