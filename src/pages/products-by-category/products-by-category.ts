import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {ProductDetailsPage} from "../product-details/product-details";

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  wooCommerce: any;
  products: any[];
  category:any;
  page:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public  toastcntrl:ToastController) {

    this.page=1;
    this.category=this.navParams.get("category");
    this.wooCommerce = WC(
      {
        url: "http://test.institucion.net/dani/wordpress",
        consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
        consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
      });

    this.loadMoreProducts1(null);
    this.wooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = (JSON.parse(data.body)).products;
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    this.page++;
  }

  loadMoreProducts1(event) {
      this.wooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
        console.log(JSON.parse(data.body));

        this.products = this.products.concat(JSON.parse(data.body).products);


        /*this.products = this.products.concat(JSON.parse(data.body).products);*/

        /*if(event!=null)
        {
          event.complete();
        }*/

        if (JSON.parse(data.body).products.length < 10) {
          event.enable(false);
          this.toastcntrl.create({
            message: "No more products",
            duration: 5000
          }).present();
        }
      }, (error) => {
        console.log(error);
      })
    }

  OpenProductPage(product) {
    this.navCtrl.push(ProductDetailsPage,{"product": product});
    console.log(product);
  }
}
