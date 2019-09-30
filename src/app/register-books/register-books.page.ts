import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { Book } from '../entities/book';

@Component({
  selector: 'app-register-books',
  templateUrl: './register-books.page.html',
  styleUrls: ['./register-books.page.scss'],
  providers: [DbService]
})
export class RegisterBooksPage implements OnInit {
  book: Book;

  constructor(private router: Router, private dbService: DbService) { 
    this.book = new Book;
  }
  salvarBook(){
    this.dbService.insertInList('books',this.book);
    
    alert('Livro adicionado com sucesso!');
  }
  ngOnInit() {
  }

}
