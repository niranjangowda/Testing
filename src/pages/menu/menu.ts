import {Component, ViewChild} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import * as WC from 'woocommerce-api';
import {ProductsByCategoryPage} from "../products-by-category/products-by-category";
import {SignupPage} from "../signup/signup";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: any;
  wooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavController: NavController;
  loggedIn: Boolean;
  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage:Storage,
              public modalCtrl:ModalController,
              public loadcntrl:LoadingController) {
    this.homePage = HomePage;
    this.categories = [];
    this.user={};
    this.wooCommerce = WC(
      {
        url: "http://test.institucion.net/dani/wordpress",
        consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
        consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
      });

    1;
    /* let loading = this.loadcntrl.create({
          spinner:'ios',
          content: "Please wait...."
        });

        loading.present();

        setTimeout(()=>{
          this.loading.dismiss();
        },6000); */

    this.wooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].parent == 0) {
          if (temp[i].slug == "clothing") {
            temp[i].icon = "shirt";
          }
          if (temp[i].slug == "music") {
            temp[i].icon = "musical-notes";
          }
          if (temp[i].slug == "posters") {
            temp[i].icon = "images";
          }
          this.categories.push(temp[i]);
        }
      }
    }, (error) => {
      console.log(error)
    })
  }

  ionViewDidEnter() {
    this.storage.ready().then( ()=> {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {

        if(userLoginInfo!=null) {
          console.log("User Logged in");
        this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn=true;
       }
       else {
          console.log("no user found");
          this.user={};
          this.loggedIn=false;
        }
      })
    })
  }

  openCategoryPage(category) {
    this.childNavController.setRoot(ProductsByCategoryPage, {"category": category});
  }

  openPage(pageName: string) {
    if (pageName == "signup") {
      this.navCtrl.push(SignupPage);
    }

    if(pageName == "login") {
      this.navCtrl.push(LoginPage);
    }
    if (pageName == 'logout') {
      this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if (pageName == 'cart') {
      let modal = this.modalCtrl.create(CartPage);
      modal.present();
    }
  }

  /*goHome() {
    this.navCtrl.setRoot(MenuPage);
  }*/
}

