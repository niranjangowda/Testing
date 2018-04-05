import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newUser : any = {};
  billing_shipping_same: boolean;
  wooCommerce : any;
  sample1 : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastcntrl:ToastController,
              public alertCtrl:AlertController) {
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false;

    this.wooCommerce = WC(
      {
        url: "http://test.institucion.net/dani/wordpress",
        consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
        consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  setBillingToShipping() {
    this.billing_shipping_same=!this.billing_shipping_same;
  }

  checkEmail() {
    let validdEmail= false;
     let reg= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if(reg.test(this.newUser.email)) {
       this.wooCommerce.getAsync('customers/email/' + this.newUser.email).then( (data)=> {
         let res = JSON.parse(data.body);

         if(res.errors) {
           validdEmail=true;

           this.toastcntrl.create({
             message: "congratulations you are good to go",
             duration:3000
           }).present();
         }
         else {
           validdEmail=false;

           this.toastcntrl.create({
             message: "Email is already registered",
             showCloseButton:true
           }).present();

         }
         console.log(validdEmail);
       })
     }

     else  {
       validdEmail=false;

       this.toastcntrl.create({
         message: "Inavalid Email",
         showCloseButton:true
       }).present();

       console.log(validdEmail);
     }
  }
  signup() {

    let customerData = {
      customer : {}
    };

    customerData.customer = {
      "email": this.newUser.email,
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "username": this.newUser.username,
      "password": this.newUser.password,
      "billing_address": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.billing_address.address_1,
        "address_2": this.newUser.billing_address.address_2,
        "city": this.newUser.billing_address.city,
        "state": this.newUser.billing_address.state,
        "postcode": this.newUser.billing_address.postcode,
        "country": this.newUser.billing_address.country,
        "email": this.newUser.email,
        "phone": this.newUser.billing_address.phone
      },
      "shipping_address": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.shipping_address.address_1,
        "address_2": this.newUser.shipping_address.address_2,
        "city": this.newUser.shipping_address.city,
        "state": this.newUser.shipping_address.state,
        "postcode": this.newUser.shipping_address.postcode,
        "country": this.newUser.shipping_address.country
      }
    };

    if(this.billing_shipping_same){
      this.newUser.shipping_address = this.newUser.shipping_address;
    }

    this.wooCommerce.postAsync('customers', customerData).then( (data) => {

      let response = (JSON.parse(data.body));

      if(response.customer){
        this.alertCtrl.create({
          title: "Account Created",
          message: "Your account has been created successfully! Please login to proceed.",
          buttons: [{
            text: "Login",
            handler: ()=> {
              //TODO
            }
          }]
        }).present();
      }

      else if(response.errors){
        this.toastcntrl.create({
          message: response.errors[0].message,
          showCloseButton: true
        }).present();
      }

    })
  }
}
