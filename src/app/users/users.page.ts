import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { DBService } from '../services/db.service';
import { User } from '../entities/user';
import { LoadingController, ActionSheetController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CameraService } from '../services/camera.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EditUserPage } from '../edit-user/edit-user.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  providers: [Camera, CameraService]
})
export class UsersPage implements OnInit {
  userOk: User;
  loading;
  
  constructor(private router: Router,private authentication: AuthenticationService, private dbService: DBService, private loadingController: LoadingController, private actionSheetController: ActionSheetController, private cameraService: CameraService, private toastController: ToastController, private modalController: ModalController, private alertController: AlertController) { 
    this.userOk = new User();
    this.getUser();
    
  }

  async editUser(user: User) {
    const modal = await this.modalController.create({
      component: EditUserPage,
      componentProps: {
        editingUser: user
      }
    });
    return await modal.present();
  }
  ngOnInit() {
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
              this.userOk.photo = foto;
            }    
            );
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.cameraService.pickFromGallery().then((foto) => {
              this.userOk.photo = foto;
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
 
  async sair(){
    await this.presentLoading();
    this.authentication.logout();
    this.router.navigate(['/home']);
    await this.hideLoading();
  }
  async getUser(){
    await this.presentLoading();
    this.userOk = await this.authentication.loggedInUser()
    await this.hideLoading();
    console.log(this.userOk);
  }

  async deleteUser(key: string){
    await this.dbService.remove('usuarios', key);
    alert('Sua conta foi desativada.');
  }
  async desativar(){
    await this.presentLoading();
    this.authentication.delete();
    this.deleteUser(this.userOk.uid);
    this.router.navigate(['/home']);
    await this.hideLoading();
  }

  redefinirSenha(){
    this.router.navigate(['/reset-password'])
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Deseja mesmo desativar sua conta permanentemente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.desativar();
          }
        }
      ]
    });



    await alert.present();
  }

}
