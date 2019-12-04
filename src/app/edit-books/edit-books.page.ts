import { Component, OnInit } from '@angular/core';
import { Book } from '../entities/book';
import { ModalController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { CameraService } from '../services/camera.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.page.html',
  styleUrls: ['./edit-books.page.scss'],
  providers: [Camera, CameraService]
})
export class EditBooksPage implements OnInit {

  editingBook: Book;
  books: Book[];
  loading;

  constructor(private modalController: ModalController, private dbService: DBService, private loadingController: LoadingController,  private toastController: ToastController, private cameraService: CameraService,  private actionSheetController: ActionSheetController) { 
    this.initialize();
  }

  async initialize() {
    await this.presentLoading();

    this.books = await this.dbService.listWithUIDs<Book>('livros');

    await this.hideLoading();
   }

  async hideLoading() {
    this.loading.dismiss();
   }

   async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await this.loading.present();

  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async save() {
    await this.presentLoading();

    await this.dbService.update('books', this.editingBook.bid, { title: this.editingBook.title, description: this.editingBook.description, author: this.editingBook.author, genre: this.editingBook.genre, releaseYear: this.editingBook.releaseYear, photo: this.editingBook.photo || null});

    await this.hideLoading();

    this.presentToast('Dados atualizados');

    this.dismiss();
  }

  async presentToast(displayMessage: string) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();

  }
  async changePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.cameraService.takePicture().then((foto) => {
              this.editingBook.photo = foto;
            }    
            );
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.cameraService.pickFromGallery().then((foto) => {
              this.editingBook.photo = foto;
            }
            );
          }
        }, 
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  

}
