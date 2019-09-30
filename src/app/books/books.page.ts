import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.service';
import { Book } from '../entities/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  books: Book[];
  constructor(private router: Router, private dbService: DBService) {
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

  edit(book) {
    book.isEditing = true;
  }

  cancelEdit(book) {
    book.isEditing = false;
  }

  confirmEdit(book) {
    this.dbService.update('books', book.uid, {
      title: book.title,
      description: book.description,
      author: book.author,
      genre: book.genre,
      releaseYear: book.releaseYear
    });
    book.isEditing = false;
    }
    ngOnInit() {
    }

  }
