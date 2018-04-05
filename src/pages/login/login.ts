import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;
  response: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public  http: HttpClient,
              public storage: Storage,
              public toastcntrl: ToastController,
              public alert: AlertController) {
    this.username = "";
    this.password = "";
  }

  login() {

    this.http.get("http://www.test.institucion.net/dani/wordpress/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
      .subscribe((res) => {
        console.log(res);

        this.response = res;

        if (this.response.error) {
          this.toastcntrl.create({
            message: "Login unsuccessful!!! pls try again",
            duration: 3000,
          }).present();
          return;
        }
        this.storage.set("userLoginInfo", res).then((data) => {

          this.alert.create({
            title: "Login successfull",
            message: "You have logged in successfully.",
            buttons: [{
              text: "ok",
              handler: () => {
                if (this.navParams.get("next")) {
                  this.navCtrl.push(this.navParams.get("next"));
                }
                else {
                  this.navCtrl.pop();
                }
              }
            }]
          }).present();
        })
      });
  }
}
