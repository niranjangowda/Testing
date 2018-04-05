import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {ProductDetailsPage} from "../product-details/product-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  wooCommerce: any;
  products: any[];
  moreProducts: any[];
  page :number;
  @ViewChild( 'productSlides') productSlides : any;

  constructor(public navCtrl: NavController,
              public toastcntrl: ToastController) {
    this.page = 2;
    //this.loadMoreProducts();
    //this.trasfer()

    this.wooCommerce = WC(
      {
        url: "http://test.institucion.net/dani/wordpress",
        consumerKey: "ck_key",
        consumerSecret: "cs_secret"
      });
    this.loadMoreProducts(null);

    this.wooCommerce.getAsync("products").then((data) => {
      console.log(JSON.parse(data.body));

      this.products = (JSON.parse(data.body)).products;
    }, (error) => {
      console.log(error);
    })

  }

  ionViewDidLoad() {
    setInterval( () => {
      if (this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    },3000) }

  loadMoreProducts(event) {

    if(event == null)
    {
      this.page =2;
      this.moreProducts = [] ;
    }

    else
    {
      this.page++;
    }

    this.wooCommerce.getAsync("products?page=" + this.page).then((data) => {
      console.log(JSON.parse(data.body));

      /*this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);*/

      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event!=null)
      {
        event.complete();
      }
      if(JSON.parse(data.body).products.length < 10)
      {
        event.enable(false);
        this.toastcntrl.create({
          message: "No more products",
          duration:5000
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

  presentLoadingDefault() {

  }
}
