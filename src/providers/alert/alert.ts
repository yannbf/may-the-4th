import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {
    constructor(public alertCtrl: AlertController) { }

    presentAlert(title: string, message: string) {
        let alert = this.alertCtrl.create(
            {
                title: title,
                subTitle: message,
                buttons: [
                    {
                        text: 'OK'
                    }
                ]
            })

        return alert.present();
    }

    presentErrorAlert(message: string) {
        return this.presentAlert("An error has occurred.", message);
    }

    presentAlertWithCallback(title: string, message: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const confirm = this.alertCtrl.create({
                title,
                message,
                buttons: [{
                    cssClass: 'darkside-button',
                    text: 'Dark',
                    role: 'cancel',
                    handler: () => {
                        confirm.dismiss().then(() => resolve('dark'));
                        return false;
                    }
                }, {
                    text: 'Light',
                    handler: () => {
                        confirm.dismiss().then(() => resolve('light'));
                        return false;
                    }
                }]
            });

            return confirm.present();
        });
    }

    getUserSide(){
      return this.presentAlertWithCallback('What side are you on?',
        'Seek the answer from the bottom of your heart.');
    }

    getUserName(){
      let inputs =  [
            {
              name: 'name',
              placeholder: 'Your name'
            },
          ];

      return this.presentAlertWithInput('Star Warnic', inputs, 'John Doe');
    }

    presentAlertWithInput(title: string, inputs: any, defaultValue: any): Promise<boolean>{
      return new Promise((resolve, reject) => {
        const alert = this.alertCtrl.create({
          title: title,
          inputs: inputs,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                alert.dismiss().then(() => resolve(data.name || defaultValue));
                return false;
              }
            }
          ]
        });

        return  alert.present();
      });
    }
}