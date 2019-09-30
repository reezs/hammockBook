import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { Router } from '@angular/router';
import { Book } from '../entities/book';

@Component({
  selector: 'app-register-books',
  templateUrl: './register-books.page.html',
  styleUrls: ['./register-books.page.scss'],
  providers: [DBService]
})
export class RegisterBooksPage implements OnInit {
  book: Book;

  constructor(private router: Router, private dbService: DBService) { 
    this.book = new Book;
  }
  
  salvarBook(){
    this.dbService.insertInList('books',this.book);
    
    alert('Livro adicionado com sucesso!');
  }
  ngOnInit() {
  }

}
