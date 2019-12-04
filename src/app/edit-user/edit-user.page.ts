import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { LoadingController, ToastController, ModalController, ActionSheetController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AuthenticationService } from '../services/authentication.service';
import { CameraService } from '../services/camera.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  providers: [Camera, CameraService]
})
export class EditUserPage implements OnInit {

  editingUser: User;
  loading;

  constructor(private modalController: ModalController, private dbService: DBService, private loadingController: LoadingController,  private toastController: ToastController, private authentication: AuthenticationService, private cameraService: CameraService, private actionSheetController: ActionSheetController) { 
    this.initialize();
  }

async initialize() {
    await this.presentLoading();

   

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
  async changePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.cameraService.takePicture().then((foto) => {
              this.editingUser.photo = foto;
            }    
            );
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.cameraService.pickFromGallery().then((foto) => {
              this.editingUser.photo = foto;
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
  async save() {
    await this.presentLoading();

    await this.dbService.update('usuarios', this.editingUser.uid, { photo: this.editingUser.photo || null, name: this.editingUser.name});

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
}
