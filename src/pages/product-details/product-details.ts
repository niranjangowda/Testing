import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {Storage} from "@ionic/storage";
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  wooCommerce: any;
  product: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public  storage: Storage,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController) {

    this.product = this.navParams.get("product");
    console.log(this.product);

    this.wooCommerce = WC(
      {
        url: "http://test.institucion.net/dani/wordpress",
        consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
        consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
      });

    this.wooCommerce.getAsync("products/" + this.product.id + "/reviews").then((data) => {
      console.log(JSON.parse(data.body));
      this.reviews = (JSON.parse(data.body)).product_reviews;
      console.log(this.reviews);
    }, (error) => {
      console.log(error);
    })
  }

/*  addToCart(product) {
    this.storage.get("cart").then((data) => {
      if (data == null || data.length == 0) {
        data = [];

        data.push({
          "product": this.product,
          "qty": 1,
          "amount": parseFloat(this.product.price)
        })
      }
      else {
        let added = 0;
        for (let i = 0; i < data.length; i++) {
          if (product.id == data[i].product.id) {
            let qty = data[i].qty;

            console.log("product is already in the cart");

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }

        if (added == 0) {
          data.push({
            "product": this.product,
            "qty": 1,
            "amount": parseFloat(this.product.price)
          });
        }
      }

      this.storage.set("cart", data).then((data) => {
        console.log("cart updated");

        this.toastCtrl.create({
          message: "card updated",
          duration: 3000
        }).present();
      })
    });
  }

  openCart() {

    this.modalCtrl.create(Cart).present();

  }*/

  addToCart(product) {

    this.storage.get("cart").then((data) => {

      if (data == null || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })
      } else {

        let added = 0;

        for (let i = 0; i < data.length; i++) {

          if (product.id == data[i].product.id) {
            let qty = data[i].qty;

            console.log("Product is already in the cart");

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }

        }

        if (added == 0) {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          })
        }

      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();

      })

    })

  }

  openCart(){
    this.modalCtrl.create(CartPage).present();

  }
}
