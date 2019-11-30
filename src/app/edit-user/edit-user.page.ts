import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  editingUser: User;
  loading;
  emailOk: string;
  constructor(private modalController: ModalController, private dbService: DBService, private loadingController: LoadingController,  private toastController: ToastController, private authentication: AuthenticationService) { 
    this.initialize();
  }

async initialize() {
    await this.presentLoading();

    this.emailOk = await this.authentication.getUserAuth();

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

    await this.dbService.update('usuarios', this.editingUser.uid, { name: this.editingUser.name});

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
