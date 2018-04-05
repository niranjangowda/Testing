import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MenuPage} from "../pages/menu/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicStorageModule} from "@ionic/storage";
import {Http, HttpModule} from "@angular/http";
import {ProductsByCategoryPage} from "../pages/products-by-category/products-by-category";
import {ProductDetailsPage} from "../pages/product-details/product-details";
import {CartPage} from "../pages/cart/cart";
import {SignupPage} from "../pages/signup/signup";
import {LoginPage} from "../pages/login/login";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TestPage} from "../pages/test/test";
import {CheckoutPage} from "../pages/checkout/checkout";
import {PayPal} from "@ionic-native/paypal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    TestPage,
    CheckoutPage
    /**/
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    TestPage,
    CheckoutPage
    //FormData
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
