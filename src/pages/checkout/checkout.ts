import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import * as WC from 'woocommerce-api';
import {HomePage} from "../home/home";
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  wooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage:Storage,
              public alertCntrl: AlertController,
              public payPal : PayPal)  {
    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }];

    this.wooCommerce = WC(
      {
        url: "http://test.institucion.net/dani/wordpress",
        consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
        consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
      });

    this.storage.get("userLoginInfo").then((userLoginInfo) => {


      this.userInfo = userLoginInfo.user;

      let email = userLoginInfo.user.email;

      this.wooCommerce.getAsync("customers/email/" + email).then((data) => {

        this.newOrder = JSON.parse(data.body).customer;
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }
  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }
  }

  placeOrder() {
    let orderItems: any[]=[];
    let data : any ={};

    let paymentData: any= {};

    this.paymentMethods.forEach((element,index)=>{
      if(element.method_id == this.paymentMethod)
      {
        paymentData= element;
      }
    });

    data = {
      payment_details :{
        method_id: paymentData.method_id,
        method_title:paymentData.method_title,
        paid: true
      },
      billing_address : this.newOrder.billing_address,
      shipping_address : this.newOrder.shipping_address,
      customerId : this.userInfo.id || '',
      line_Items : orderItems
    };

    if(this.paymentMethod.method_id == "paypal") {
      this.payPal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'AFcWxV21C7fd0v3bYYYRCpSSRl31A1ddTAmqXZBB6xFDIdKHa5N9MkkA'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          this.storage.get("cart").then((cart)=>{
            let total=0.0;
            cart.forEach((element,index)=>{
              orderItems.push({
                product_id: element.product.id,quantity: element.qty
              });
              total=total+ (element.product.price * element.qty);
            });
            let payment = new PayPalPayment(total.toString(), 'USD', 'Description', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then((response) => {

              alert(JSON.stringify(response));

              data.line_Items = orderItems;

              let orderData: any ={};

              orderData.order = data;

              this.wooCommerce.postAsync('orders',orderData).then((data)=>{
                alert("order placed succesfully");

                let response = (JSON.parse(data.body).order);

                this.alertCntrl.create({
                  title: "Order Successful",
                  message: "your order has been placed successfully. Your order number is " + response.order_number,
                  buttons:[{
                    text: "OK",
                    handler : ()=>{
                      this.navCtrl.setRoot(HomePage);
                    }
                  }]
                }).present();
              })
          });

          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });
    }
    else {
      this.storage.get("cart").then((cart)=> {
        cart.forEach((element,index )=>{
          orderItems.push({
            product_id: element.product_id,
            quantity: element.qty
          });
        });

        data.line_Items = orderItems;

        let orderData:any={};

        orderData.order =data;

        this.wooCommerce.postAsync("orders",orderData).then( (data)=>{
          let response = (JSON.parse(data.body).order);

          this.alertCntrl.create({
            title: "Order Successful",
            message: "your order has been placed successfully. Your order number is " + response.order_number,
            buttons:[{
              text: "OK",
              handler : ()=>{
                this.navCtrl.setRoot(HomePage);
              }
            }]
          }).present();
        })
      })
    }
  }
}
