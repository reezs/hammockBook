import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditBooksPage } from '../edit-books/edit-books.page';
import { Book } from '../entities/book';
import { DBService } from '../services/db.service';
import { ModalController } from '@ionic/angular';
import { User } from '../entities/user';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  books: Book[];
  userOk: User;
  constructor(private router: Router, private dbService: DBService, private modalController: ModalController, private authentication: AuthenticationService) {
    this.getUser();
    this.listarBooks();
    
  }
  registrarBooks() {
    this.router.navigate(['register-books'])
  }
  async listarBooks() {
    this.books = await this.dbService.listWithUIDs<Book>('books');
      
    
  }

  async deletarBook(key: string) {
    await this.dbService.remove('books', key);

    alert('Livro removido com sucesso!');

    this.listarBooks();
  }

  async editBook(book: Book) {
    const modal = await this.modalController.create({
      component: EditBooksPage,
      componentProps: {
        editingBook: book
      }
    });
    return await modal.present();
  }
  ngOnInit() {
  }

  async getUser() {
    this.userOk = await this.authentication.loggedInUser();
    if (!this.userOk.books) {
      this.userOk.books = [];
    }
        
  }
  async clickStar(key: string) {
    this.userOk.books.push(key);
    
    await this.dbService.update('usuarios', this.userOk.uid, { books: this.userOk.books });
    
    

  }
}
