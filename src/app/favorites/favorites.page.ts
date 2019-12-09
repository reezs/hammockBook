import { Component, OnInit } from '@angular/core';
import { Book } from '../entities/book';
import { User } from '../entities/user';
import { AuthenticationService } from '../services/authentication.service';
import { DBService } from '../services/db.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  books: Book[];
  userOk: User;
  booksDB: Book[];
  book: Book;
  constructor(private authentication: AuthenticationService, private dbService: DBService) {
    this.book = new Book();
  }
  async getUser() {
    this.userOk = await this.authentication.loggedInUser();
  }

  async listarFavoritos() {
    this.booksDB = await this.dbService.listWithUIDs<Book>('books');
    if (this.userOk.books) {
      this.userOk.books.forEach(key => {
        this.book = this.booksDB.find(book => book.uid === key);
        this.books.push(this.book);
      })
    }
    
  }
  ionViewDidEnter() {
   
  }
  async ngOnInit() {
    this.userOk = new User();
    await this.getUser();
    this.books = [];
    this.listarFavoritos();
  }

}
