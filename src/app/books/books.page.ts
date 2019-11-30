import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditBooksPage } from '../edit-books/edit-books.page';
import { Book } from '../entities/book';
import { DBService } from '../services/db.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  books: Book[];
  constructor(private router: Router, private dbService: DBService, private modalController: ModalController) {
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

  }
