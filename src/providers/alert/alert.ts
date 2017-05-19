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

    getUserConsent(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const confirm = this.alertCtrl.create({
                title: 'Welcome to Star Warnic!',
                message: `
                      <p>Thanks for using this!</p>
                      <p>We would like to get some basic information of yours in order to keep the app very fun!</p>
                      <p>On the left menu there's a page with a map that shows all of users and which side they're on!</p>
                      <p>To do so, we'd love to have your name(or nickname), location and to know which side you're on. Note that this data is not
                      used anywhere else other than the maps page and it's completely optional!</p>
                    `,
                buttons: [{
                    cssClass: 'darkside-button',
                    text: 'Never',
                    role: 'cancel',
                    handler: () => {
                        confirm.dismiss().then(() => resolve(false));
                        return false;
                    }
                }, {
                    text: 'Let\'s go!',
                    handler: () => {
                        confirm.dismiss().then(() => resolve(true));
                        return false;
                    }
                }]
            });

            return confirm.present();
        });
    }

    getUserSide(): Promise<string> {
        return new Promise((resolve, reject) => {
            const confirm = this.alertCtrl.create({
                title: 'What side are you on?',
                message: 'Are you a sith or a jedi? :)',
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

    getUserName(){
      let inputs =  [
            {
              name: 'name',
              placeholder: 'Your name'
            },
          ];

      return this.presentAlertWithInput('What is your name?', inputs, 'John Doe');
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