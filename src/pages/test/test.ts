import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  wooCommerce: any;
  products: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.wooCommerce = WC(
      {
        url: "http://test.institucion.net/dani/wordpress",
        consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
        consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
      });

    this.wooCommerce.getAsync("products").then((data)=>{
      console.log(JSON.parse(data.body));
      this.products=(JSON.parse(data.body)).products;
      }, (error)=> {console.log(error)});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

}
/*This is just to test my knowledge in github*/
