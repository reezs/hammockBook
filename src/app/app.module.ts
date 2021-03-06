import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { DBService } from './services/db.service';
import { EditBooksPage } from './edit-books/edit-books.page';
import { FormsModule } from '@angular/forms';
import {EditUserPage } from './edit-user/edit-user.page'

@NgModule({
  declarations: [AppComponent, EditBooksPage, EditUserPage],
  entryComponents: [EditBooksPage, EditUserPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireDatabase,
    AngularFireAuth,
    DBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
