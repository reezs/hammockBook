import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { Router } from '@angular/router';
import { Book } from '../entities/book';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-register-books',
  templateUrl: './register-books.page.html',
  styleUrls: ['./register-books.page.scss'],
  providers: [DBService, LocalNotifications]
})
export class RegisterBooksPage implements OnInit {
  book: Book;

  constructor(private router: Router, private dbService: DBService, private localNotifications: LocalNotifications) { 
    this.book = new Book;
  }

  generateNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Registro',
      text: `Um novo livro foi adicionado`,
      sound: 'file://sound.mp3'
    });
  }
  
  async salvarBook(){
    await this.dbService.insertInList('books',this.book);
    await this.generateNotification();
    alert('Livro adicionado com sucesso!');
    this.router.navigate(['/tabs/books']);
  }
  ngOnInit() {
  }

}
