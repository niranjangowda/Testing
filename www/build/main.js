webpackJsonp([0],{

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_woocommerce_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_details_product_details__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, toastcntrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastcntrl = toastcntrl;
        this.page = 2;
        //this.loadMoreProducts();
        //this.trasfer()
        this.wooCommerce = __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__({
            url: "http://test.institucion.net/dani/wordpress",
            consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
            consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
        });
        this.loadMoreProducts(null);
        this.wooCommerce.getAsync("products").then(function (data) {
            console.log(JSON.parse(data.body));
            _this.products = (JSON.parse(data.body)).products;
        }, function (error) {
            console.log(error);
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setInterval(function () {
            if (_this.productSlides.getActiveIndex() == _this.productSlides.length() - 1)
                _this.productSlides.slideTo(0);
            _this.productSlides.slideNext();
        }, 3000);
    };
    HomePage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        if (event == null) {
            this.page = 2;
            this.moreProducts = [];
        }
        else {
            this.page++;
        }
        this.wooCommerce.getAsync("products?page=" + this.page).then(function (data) {
            console.log(JSON.parse(data.body));
            /*this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);*/
            _this.moreProducts = _this.moreProducts.concat(JSON.parse(data.body).products);
            if (event != null) {
                event.complete();
            }
            if (JSON.parse(data.body).products.length < 10) {
                event.enable(false);
                _this.toastcntrl.create({
                    message: "No more products",
                    duration: 5000
                }).present();
            }
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.OpenProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
        console.log(product);
    };
    HomePage.prototype.presentLoadingDefault = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('productSlides'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "productSlides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-spinner name="bubbles">Loading</ion-spinner>\n<ion-content padding>\n\n  <ion-card>\n    <ion-slides autoplay="3000" no-padding="" pager>\n      <ion-slide>\n        <img src="assets/imgs/artificial-photography-119282-unsplash.jpg">\n      </ion-slide>\n      <ion-slide>\n        <img src="assets/imgs/clark-street-mercantile-33931-unsplash.jpg">\n      </ion-slide>\n      <ion-slide>\n        <img src="assets/imgs/freestocks-org-187367-unsplash.jpg">\n      </ion-slide>\n    </ion-slides>\n  </ion-card>\n\n\n  <ion-grid>\n    <ion-row>\n      <ion-slides #productSlides>\n        <ion-slide *ngFor="let product of products">\n          <ion-card no-padding>\n            <img [src]="product.featured_src"/>\n            <h1>{{product.title}}</h1>\n            <p  [innerHTML]="product.short_description"></p>\n          </ion-card>\n        </ion-slide>\n      </ion-slides>\n    </ion-row>\n  </ion-grid>\n\n<ion-list>\n  <ion-item *ngFor="let product1 of moreProducts" text-wrap="" (click)="OpenProductPage(product1)">\n    <ion-thumbnail item-left>\n      <img [src]="product1.featured_src"/>\n    </ion-thumbnail>\n    <h2> {{ product1.title}}</h2>\n    <p><span [innerHTML]="product1.short_description.substr(0,50) + \'....\'"></span></p>\n    <button ion-button="" clear icon item-right=""><ion-icon name="arrow-forward"></ion-icon></button>\n  </ion-item>\n</ion-list>\n\n\n  <ion-infinite-scroll (ionInfinite)="loadMoreProducts($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_woocommerce_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductDetailsPage = (function () {
    function ProductDetailsPage(navCtrl, navParams, storage, toastCtrl, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.reviews = [];
        this.product = this.navParams.get("product");
        console.log(this.product);
        this.wooCommerce = __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__({
            url: "http://test.institucion.net/dani/wordpress",
            consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
            consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
        });
        this.wooCommerce.getAsync("products/" + this.product.id + "/reviews").then(function (data) {
            console.log(JSON.parse(data.body));
            _this.reviews = (JSON.parse(data.body)).product_reviews;
            console.log(_this.reviews);
        }, function (error) {
            console.log(error);
        });
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
    ProductDetailsPage.prototype.addToCart = function (product) {
        var _this = this;
        this.storage.get("cart").then(function (data) {
            if (data == null || data.length == 0) {
                data = [];
                data.push({
                    "product": product,
                    "qty": 1,
                    "amount": parseFloat(product.price)
                });
            }
            else {
                var added = 0;
                for (var i = 0; i < data.length; i++) {
                    if (product.id == data[i].product.id) {
                        var qty = data[i].qty;
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
                    });
                }
            }
            _this.storage.set("cart", data).then(function () {
                console.log("Cart Updated");
                console.log(data);
                _this.toastCtrl.create({
                    message: "Cart Updated",
                    duration: 3000
                }).present();
            });
        });
    };
    ProductDetailsPage.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]).present();
    };
    ProductDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-details',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\product-details\product-details.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{product.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-fab right="" top edge (click)="openCart()">\n    <button ion-fab color="danger"><ion-icon name="cart"></ion-icon></button>\n  </ion-fab>\n\n  <ion-card>\n\n    <ion-slides autoplay="3000">\n      <ion-slide *ngFor="let image of product.images">\n        <img [src]="image.src" />\n      </ion-slide>\n    </ion-slides>\n\n    <ion-card-content>\n\n      <ion-card-title>\n        {{product.title}}\n        <ion-chip *ngFor="let cat of product.categories">\n          <ion-label color="danger">{{ cat }}</ion-label>\n        </ion-chip>\n      </ion-card-title>\n\n      <p [innerHTML]="product.description"></p>\n\n    </ion-card-content>\n\n    <button ion-button="" icon-left block outline color="danger" (click)="addToCart(product)">\n      <ion-icon name="basket">Add to cart</ion-icon>\n    </button>\n\n  </ion-card>\n\n  <ion-card *ngIf=" product.attributes.length > 0">\n\n  <ion-card-content>\n\n    <ion-card-title>\n      Specifications\n    </ion-card-title>\n\n    <ion-grid>\n\n      <ion-row *ngFor="let att of product.attributes">\n        <ion-col col-4="">\n          {{att.name}}\n        </ion-col>\n        <ion-col col-8="">\n          <span *ngFor="let option of att.options">{{ option }}</span>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card-content>\n\n</ion-card>\n\n  <ion-card  *ngIf="reviews.length > 0">\n\n    <ion-card-content>\n\n      <ion-card-title>Reviews</ion-card-title>\n\n      <ion-grid>\n        <ion-row *ngFor="let review of reviews">\n\n          <ion-col col-4>\n            <b>{{review.reviewer_name}}</b><br/>\n\n            <span *ngIf="review.rating>=1" small ></span>\n            <ion-icon name="start"></ion-icon>\n\n            <span *ngIf="review.rating>=2" ></span>\n            <ion-icon name="start" small></ion-icon>\n\n            <span *ngIf="review.rating>=3" ></span>\n            <ion-icon name="start" small></ion-icon>\n\n            <span *ngIf="review.rating>=4" ></span>\n            <ion-icon name="start" small></ion-icon>\n\n            <span *ngIf="review.rating>=5" ></span>\n            <ion-icon name="start" small></ion-icon>\n\n\n          </ion-col>\n\n\n          <ion-col col-8>\n            {{review.review}}\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\product-details\product-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]])
    ], ProductDetailsPage);
    return ProductDetailsPage;
}());

//# sourceMappingURL=product-details.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(181);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CartPage = (function () {
    function CartPage(navCtrl, navParams, storage, viewcntrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewcntrl = viewcntrl;
        this.cartItems = [];
        this.total = 0.0;
        this.storage.ready().then(function () {
            _this.storage.get("cart").then(function (data) {
                console.log(data);
                _this.cartItems = data;
                if (_this.cartItems.length > 0) {
                    _this.cartItems.forEach(function (item, index) {
                        _this.total = _this.total + (item.product.price * item.qty);
                    });
                }
                else {
                    _this.showEmptyCart = true;
                }
            });
        });
    }
    CartPage.prototype.removeFromCart = function (item, i) {
        var _this = this;
        var price = item.product.price;
        var qty = item.qty;
        this.cartItems.splice(i, 1);
        this.storage.set("cart", this.cartItems).then(function () {
            _this.total = _this.total - (price * qty);
        });
        if (this.cartItems.length == 0) {
            this.showEmptyCart = true;
        }
    };
    CartPage.prototype.closeModal = function () {
        this.viewcntrl.dismiss();
    };
    CartPage.prototype.checkout = function () {
        var _this = this;
        this.storage.get("userLoginInfo").then(function (data) {
            if (data != null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* CheckoutPage */]);
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], { next: __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* CheckoutPage */] });
            }
        });
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\cart\cart.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Your cart</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n    <ion-grid>\n      <ion-row>Your cart description</ion-row>\n      <ion-row [hidden]="!showEmptyCart">\n        <ion-col>There are no products in your cart</ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n<ion-list>\n  <ion-item *ngFor="let item of cartItems;let i = index">\n\n    <ion-thumbnail item-left="">\n      <img [src]="item.product.featured_src"/>\n    </ion-thumbnail>\n    <h2>{{item.product.title}}</h2>\n    <p>{{item.qty}} . {{item.product.price}}</p>\n    <button ion-button="" clear item-right="" color="danger" (click)="removeFromCart(item,i)">\n      <ion-icon name="close-circle" color="danger"></ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n\n  <ion-grid>\n    <ion-card>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2=""></ion-col>\n          <ion-col col-4=""><b>TOTAL</b></ion-col>\n          <ion-col col-3=""></ion-col>\n          <ion-col col-3="" style="text-align: right"><b>{{ total }}</b></ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button="" color="danger" outline block (click)="closeModal()">Back</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button="" color="danger" block (click)="checkout()">checkout</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\cart\cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, http, storage, toastcntrl, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.toastcntrl = toastcntrl;
        this.alert = alert;
        this.username = "";
        this.password = "";
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.http.get("http://www.test.institucion.net/dani/wordpress/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
            .subscribe(function (res) {
            console.log(res);
            _this.response = res;
            if (_this.response.error) {
                _this.toastcntrl.create({
                    message: "Login unsuccessful!!! pls try again",
                    duration: 3000,
                }).present();
                return;
            }
            _this.storage.set("userLoginInfo", res).then(function (data) {
                _this.alert.create({
                    title: "Login successfull",
                    message: "You have logged in successfully.",
                    buttons: [{
                            text: "ok",
                            handler: function () {
                                if (_this.navParams.get("next")) {
                                    _this.navCtrl.push(_this.navParams.get("next"));
                                }
                                else {
                                    _this.navCtrl.pop();
                                }
                            }
                        }]
                }).present();
            });
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n<ion-card>\n  <img src="assets/imgs/woocommerce-logo-1E4D00A887-seeklogo.com.png"/>\n</ion-card>\n\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating="">Username</ion-label>\n      <ion-input type="text" [(ngModel)]="username"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating="">Password</ion-label>\n      <ion-input type="password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <button ion-button="" block color="danger" (click)="login()">Login</button>\n  <button ion-button="" block clear (click)="openPage(\'signup\')">No account yet? sign up here</button>\n\n</ion-content>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 235:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 235;

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_woocommerce_api__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_woocommerce_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__products_by_category_products_by_category__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cart_cart__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MenuPage = (function () {
    function MenuPage(navCtrl, navParams, storage, modalCtrl, loadcntrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.loadcntrl = loadcntrl;
        this.homePage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.categories = [];
        this.user = {};
        this.wooCommerce = __WEBPACK_IMPORTED_MODULE_3_woocommerce_api__({
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
        this.wooCommerce.getAsync("products/categories").then(function (data) {
            console.log(JSON.parse(data.body).product_categories);
            var temp = JSON.parse(data.body).product_categories;
            for (var i = 0; i < temp.length; i++) {
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
                    _this.categories.push(temp[i]);
                }
            }
        }, function (error) {
            console.log(error);
        });
    }
    MenuPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    console.log("User Logged in");
                    _this.user = userLoginInfo.user;
                    console.log(_this.user);
                    _this.loggedIn = true;
                }
                else {
                    console.log("no user found");
                    _this.user = {};
                    _this.loggedIn = false;
                }
            });
        });
    };
    MenuPage.prototype.openCategoryPage = function (category) {
        this.childNavController.setRoot(__WEBPACK_IMPORTED_MODULE_4__products_by_category_products_by_category__["a" /* ProductsByCategoryPage */], { "category": category });
    };
    MenuPage.prototype.openPage = function (pageName) {
        var _this = this;
        if (pageName == "signup") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
        }
        if (pageName == "login") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        }
        if (pageName == 'logout') {
            this.storage.remove("userLoginInfo").then(function () {
                _this.user = {};
                _this.loggedIn = false;
            });
        }
        if (pageName == 'cart') {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__cart_cart__["a" /* CartPage */]);
            modal.present();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
    ], MenuPage.prototype, "childNavController", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="card-background-page">\n    <ion-card>\n      <img src="assets/imgs/clark-street-mercantile-33931-unsplash.jpg">\n      <div class="card-title">WOOIONIC</div>\n      <div class="card-subtitle">keep shopping</div>\n    </ion-card>\n\n    <ion-list>\n      <ion-item-divider color="danger">Categories</ion-item-divider>\n      <ion-card *ngFor="let category of categories">\n      <ion-item  color="light" text-wrap="" (click)="openCategoryPage(category)" menuClose="">\n        <ion-icon [name]="category.icon" item-left="" large=""></ion-icon>\n        <h2>{{ category.name }}</h2>\n        <p>{{ category.description }}</p>\n      </ion-item>\n      </ion-card>\n\n      <ion-item-divider color="danger">Account</ion-item-divider>\n      <ion-item (click)="openPage(\'signup\')" menuClose="" *ngIf="!loggedIn">\n        <ion-icon name="md-clipboard" item-left="" large></ion-icon>\n        <h2>Signup</h2>\n        <p>For a new account</p>\n      </ion-item>\n\n      <ion-item (click)="openPage(\'login\')" menuClose="" *ngIf="!loggedIn">\n        <ion-icon name="log-in" item-left="" large></ion-icon>\n        <h2>Login</h2>\n        <p>using email and password</p>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" menuClose>\n        <ion-icon name="contact" item-left large></ion-icon>\n        <h2>{{ (this.user.firstname == \'\' ? this.user.username : this.user.firstname) || "" }}</h2>\n        <p>Welcome</p>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" (click)="openPage(\'cart\')" menuClose>\n        <ion-icon name="cart" item-left large></ion-icon>\n        <h2>Your Cart</h2>\n        <p>Check items in your cart</p>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" (click)="openPage(\'logout\')" menuClose>\n        <ion-icon name="log-out" item-left large></ion-icon>\n        <h2>Logout</h2>\n        <p>of your Account</p>\n      </ion-item>\n\n\n    </ion-list>\n\n    <!--<ion-infinite-scroll (ionInfinite)="loadMoreProducts1($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>-->\n\n  </ion-content>\n\n\n</ion-menu>\n\n<ion-nav #content [root]="homePage" ></ion-nav>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_woocommerce_api__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_woocommerce_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__ = __webpack_require__(340);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CheckoutPage = (function () {
    function CheckoutPage(navCtrl, navParams, storage, alertCntrl, payPal) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCntrl = alertCntrl;
        this.payPal = payPal;
        this.newOrder = {};
        this.newOrder.billing_address = {};
        this.newOrder.shipping_address = {};
        this.billing_shipping_same = false;
        this.paymentMethods = [
            { method_id: "bacs", method_title: "Direct Bank Transfer" },
            { method_id: "cheque", method_title: "Cheque Payment" },
            { method_id: "cod", method_title: "Cash on Delivery" },
            { method_id: "paypal", method_title: "PayPal" }
        ];
        this.wooCommerce = __WEBPACK_IMPORTED_MODULE_3_woocommerce_api__({
            url: "http://test.institucion.net/dani/wordpress",
            consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
            consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
        });
        this.storage.get("userLoginInfo").then(function (userLoginInfo) {
            _this.userInfo = userLoginInfo.user;
            var email = userLoginInfo.user.email;
            _this.wooCommerce.getAsync("customers/email/" + email).then(function (data) {
                _this.newOrder = JSON.parse(data.body).customer;
            });
        });
    }
    CheckoutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CheckoutPage');
    };
    CheckoutPage.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
        if (this.billing_shipping_same) {
            this.newOrder.shipping_address = this.newOrder.billing_address;
        }
    };
    CheckoutPage.prototype.placeOrder = function () {
        var _this = this;
        var orderItems = [];
        var data = {};
        var paymentData = {};
        this.paymentMethods.forEach(function (element, index) {
            if (element.method_id == _this.paymentMethod) {
                paymentData = element;
            }
        });
        data = {
            payment_details: {
                method_id: paymentData.method_id,
                method_title: paymentData.method_title,
                paid: true
            },
            billing_address: this.newOrder.billing_address,
            shipping_address: this.newOrder.shipping_address,
            customerId: this.userInfo.id || '',
            line_Items: orderItems
        };
        if (this.paymentMethod.method_id == "paypal") {
            this.payPal.init({
                PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
                PayPalEnvironmentSandbox: 'AFcWxV21C7fd0v3bYYYRCpSSRl31A1ddTAmqXZBB6xFDIdKHa5N9MkkA'
            }).then(function () {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                    _this.storage.get("cart").then(function (cart) {
                        var total = 0.0;
                        cart.forEach(function (element, index) {
                            orderItems.push({
                                product_id: element.product.id, quantity: element.qty
                            });
                            total = total + (element.product.price * element.qty);
                        });
                        var payment = new __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__["c" /* PayPalPayment */](total.toString(), 'USD', 'Description', 'sale');
                        _this.payPal.renderSinglePaymentUI(payment).then(function (response) {
                            alert(JSON.stringify(response));
                            data.line_Items = orderItems;
                            var orderData = {};
                            orderData.order = data;
                            _this.wooCommerce.postAsync('orders', orderData).then(function (data) {
                                alert("order placed succesfully");
                                var response = (JSON.parse(data.body).order);
                                _this.alertCntrl.create({
                                    title: "Order Successful",
                                    message: "your order has been placed successfully. Your order number is " + response.order_number,
                                    buttons: [{
                                            text: "OK",
                                            handler: function () {
                                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                                            }
                                        }]
                                }).present();
                            });
                        });
                    }, function () {
                        // Error or render dialog closed without being successful
                    });
                }, function () {
                    // Error in configuration
                });
            }, function () {
                // Error in initialization, maybe PayPal isn't supported or something else
            });
        }
        else {
            this.storage.get("cart").then(function (cart) {
                cart.forEach(function (element, index) {
                    orderItems.push({
                        product_id: element.product_id,
                        quantity: element.qty
                    });
                });
                data.line_Items = orderItems;
                var orderData = {};
                orderData.order = data;
                _this.wooCommerce.postAsync("orders", orderData).then(function (data) {
                    var response = (JSON.parse(data.body).order);
                    _this.alertCntrl.create({
                        title: "Order Successful",
                        message: "your order has been placed successfully. Your order number is " + response.order_number,
                        buttons: [{
                                text: "OK",
                                handler: function () {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                                }
                            }]
                    }).present();
                });
            });
        }
    };
    CheckoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-checkout',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\checkout\checkout.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Checkout</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item-divider color="danger">Personal Details</ion-item-divider>\n    <ion-item>\n      <ion-label>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="newOrder.billing_address.first_name"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Last Name</ion-label>\n      <ion-input type="text" [(ngModel)]="newOrder.billing_address.last_name"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Email</ion-label>\n      <ion-input readonly type="email" [(ngModel)]="newOrder.email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Username</ion-label>\n      <ion-input readonly type="text" [(ngModel)]="newOrder.username"></ion-input>\n    </ion-item>\n\n    <ion-item-divider color="danger">Billing Details</ion-item-divider>\n\n    <ion-item>\n      <ion-label>Address Line 1</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing_address.address_1"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Address Line 2</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing_address.address_2"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Country</ion-label>\n      <ion-select [(ngModel)]="newOrder.billing_address.country">\n        <ion-option value="India" selected="true">India</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>State</ion-label>\n      <ion-select [(ngModel)]="newOrder.billing_address.state">\n        <ion-option value="Karnataka">New Delhi</ion-option>\n        <ion-option value="Uttar Pradesh">Uttar Pradesh</ion-option>\n        <ion-option value="Maharashtra">Maharashtra</ion-option>\n        <ion-option value="Tamil Nadu">Tamil Nadu</ion-option>\n        <ion-option value="Madhya Pradesh">Madhya Pradesh</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>City</ion-label>\n      <ion-input type="text" [(ngModel)]="newOrder.billing_address.city"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Postal Code</ion-label>\n      <ion-input type="number" clearInput [(ngModel)]="newOrder.billing_address.postcode"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Phone</ion-label>\n      <ion-input type="tel" clearInput [(ngModel)]="newOrder.billing_address.phone"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Same Shipping Details</ion-label>\n      <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n    </ion-item>\n\n    <ion-item-divider color="danger" *ngIf="!billing_shipping_same">Shipping Details</ion-item-divider>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="newOrder.shipping_address.first_name"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Last Name</ion-label>\n      <ion-input type="text" [(ngModel)]="newOrder.shipping_address.last_name"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Address Line 1</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping_address.address_1"></ion-textarea>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Address Line 2</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping_address.address_2"></ion-textarea>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Country</ion-label>\n      <ion-select [(ngModel)]="newOrder.shipping_address.country">\n        <ion-option value="India" selected="true">India</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>State</ion-label>\n      <ion-select [(ngModel)]="newOrder.shipping_address.state">\n        <ion-option value="Karnataka">New Delhi</ion-option>\n        <ion-option value="Uttar Pradesh">Uttar Pradesh</ion-option>\n        <ion-option value="Maharashtra">Maharashtra</ion-option>\n        <ion-option value="Tamil Nadu">Tamil Nadu</ion-option>\n        <ion-option value="Madhya Pradesh">Madhya Pradesh</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>City</ion-label>\n      <ion-input type="text" [(ngModel)]="newOrder.shipping_address.city"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Postal Code</ion-label>\n      <ion-input type="number" clearInput [(ngModel)]="newOrder.shipping_address.postcode"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Phone</ion-label>\n      <ion-input type="tel" clearInput [(ngModel)]="newOrder.shipping_address.phone"></ion-input>\n    </ion-item>\n\n    <ion-item-divider color="danger">Payment Details</ion-item-divider>\n\n    <ion-item>\n      <ion-label>Payment Method</ion-label>\n      <ion-select [(ngModel)]="paymentMethod">\n        <ion-option *ngFor="let p of paymentMethods" value="{{ p.method_id }}">{{ p.method_title }}</ion-option>\n      </ion-select>\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer>\n  <button ion-button block color="danger" (click)="placeOrder()">Place Order</button>\n</ion-footer>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\checkout\checkout.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__["a" /* PayPal */]])
    ], CheckoutPage);
    return CheckoutPage;
}());

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsByCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_woocommerce_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_details_product_details__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductsByCategoryPage = (function () {
    function ProductsByCategoryPage(navCtrl, navParams, toastcntrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastcntrl = toastcntrl;
        this.page = 1;
        this.category = this.navParams.get("category");
        this.wooCommerce = __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__({
            url: "http://test.institucion.net/dani/wordpress",
            consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
            consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
        });
        this.loadMoreProducts1(null);
        this.wooCommerce.getAsync("products?filter[category]=" + this.category.slug).then(function (data) {
            console.log(JSON.parse(data.body));
            _this.products = (JSON.parse(data.body)).products;
        }, function (error) {
            console.log(error);
        });
    }
    ProductsByCategoryPage.prototype.ionViewDidLoad = function () {
        this.page++;
    };
    ProductsByCategoryPage.prototype.loadMoreProducts1 = function (event) {
        var _this = this;
        this.wooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then(function (data) {
            console.log(JSON.parse(data.body));
            _this.products = _this.products.concat(JSON.parse(data.body).products);
            /*this.products = this.products.concat(JSON.parse(data.body).products);*/
            /*if(event!=null)
            {
              event.complete();
            }*/
            if (JSON.parse(data.body).products.length < 10) {
                event.enable(false);
                _this.toastcntrl.create({
                    message: "No more products",
                    duration: 5000
                }).present();
            }
        }, function (error) {
            console.log(error);
        });
    };
    ProductsByCategoryPage.prototype.OpenProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
        console.log(product);
    };
    ProductsByCategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-products-by-category',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\products-by-category\products-by-category.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button color="danger" ion-button icon menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Products By Category</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list>\n    <ion-item *ngFor="let product1 of products" text-wrap="" (click)="OpenProductPage(product1)">\n      <ion-thumbnail item-left>\n        <img [src]="product1.featured_src"/>\n      </ion-thumbnail>\n      <h2> {{ product1.title}}</h2>\n      <p><span [innerHTML]="product1.short_description.substr(0,50) + \'....\'"></span></p>\n      <button ion-button="" clear icon item-right=""><ion-icon name="arrow-forward"></ion-icon></button>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\products-by-category\products-by-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ProductsByCategoryPage);
    return ProductsByCategoryPage;
}());

//# sourceMappingURL=products-by-category.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_woocommerce_api__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, toastcntrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastcntrl = toastcntrl;
        this.alertCtrl = alertCtrl;
        this.newUser = {};
        this.sample1 = {};
        this.newUser.billing_address = {};
        this.newUser.shipping_address = {};
        this.billing_shipping_same = false;
        this.wooCommerce = __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__({
            url: "http://test.institucion.net/dani/wordpress",
            consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
            consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
    };
    SignupPage.prototype.checkEmail = function () {
        var _this = this;
        var validdEmail = false;
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(this.newUser.email)) {
            this.wooCommerce.getAsync('customers/email/' + this.newUser.email).then(function (data) {
                var res = JSON.parse(data.body);
                if (res.errors) {
                    validdEmail = true;
                    _this.toastcntrl.create({
                        message: "congratulations you are good to go",
                        duration: 3000
                    }).present();
                }
                else {
                    validdEmail = false;
                    _this.toastcntrl.create({
                        message: "Email is already registered",
                        showCloseButton: true
                    }).present();
                }
                console.log(validdEmail);
            });
        }
        else {
            validdEmail = false;
            this.toastcntrl.create({
                message: "Inavalid Email",
                showCloseButton: true
            }).present();
            console.log(validdEmail);
        }
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        var customerData = {
            customer: {}
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
        if (this.billing_shipping_same) {
            this.newUser.shipping_address = this.newUser.shipping_address;
        }
        this.wooCommerce.postAsync('customers', customerData).then(function (data) {
            var response = (JSON.parse(data.body));
            if (response.customer) {
                _this.alertCtrl.create({
                    title: "Account Created",
                    message: "Your account has been created successfully! Please login to proceed.",
                    buttons: [{
                            text: "Login",
                            handler: function () {
                                //TODO
                            }
                        }]
                }).present();
            }
            else if (response.errors) {
                _this.toastcntrl.create({
                    message: response.errors[0].message,
                    showCloseButton: true
                }).present();
            }
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n<ion-list>\n  <ion-item-divider color="danger">Personal details</ion-item-divider>\n\n  <ion-item>\n    <ion-label>First Name</ion-label>\n    <ion-input type="text" [(ngModel)]="newUser.first_name"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Last Name</ion-label>\n    <ion-input type="text" [(ngModel)]="newUser.last_name"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Email</ion-label>\n    <ion-input type="text" [(ngModel)]="newUser.email" (ionBlur)="checkEmail()"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>User Name</ion-label>\n    <ion-input type="text" [(ngModel)]="newUser.user_name"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Password</ion-label>\n    <ion-input type="password" [(ngModel)]="newUser.password"></ion-input>\n  </ion-item>\n\n <!-- <ion-item>\n    <ion-label>Confirm Password</ion-label>\n    <ion-input type="password" [(ngModel)]="newUser.Confirm_Password"></ion-input>\n  </ion-item>-->\n\n  <!--------------------------------Billing Details------------------------------>\n\n  <ion-item-divider color="danger">Billing Details</ion-item-divider>\n  <ion-item>\n    <ion-label>Addres Line 1</ion-label>\n    <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.billing_address.address_1"></ion-textarea>\n  </ion-item>\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>Addres Line 2</ion-label>\n    <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.billing_address.address_2"></ion-textarea>\n  </ion-item>\n\n <ion-item>\n   <ion-label>Country</ion-label>\n   <ion-select [(ngModel)]="newUser.billing_address.country">\n   <ion-option value="india" selected="true">India</ion-option>\n   </ion-select>\n </ion-item>\n\n  <ion-item>\n    <ion-label>State</ion-label>\n    <ion-select [(ngModel)]="newUser.billing_address.state">\n      <ion-option value="Karnataka" selected="true">Karnataka</ion-option>\n      <ion-option value="Andhra Pradesh">Andhra Pradesh</ion-option>\n      <ion-option value="Tamil Nadu">Tamil nadu</ion-option>\n      <ion-option value="Kerala">Kerala</ion-option>\n    </ion-select>\n  </ion-item>\n\n\n  <ion-item>\n    <ion-label>City</ion-label>\n    <ion-select [(ngModel)]="newUser.billing_address.city">\n      <ion-option value="Bengaluru" selected="true">Bengaluru</ion-option>\n      <ion-option value="Amaravathi">Amaravathi</ion-option>\n      <ion-option value="Chennai">Chennai</ion-option>\n      <ion-option value="Kochi">Kochi</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Postal Code</ion-label>\n    <ion-input type="number" clearInput="" [(ngModel)]="newUser.billing_address.postcode"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Phone</ion-label>\n    <ion-input type="number" clearInput="" [(ngModel)]="newUser.billing_address.phone"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Same Shipping Details</ion-label>\n    <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n  </ion-item>\n\n<!----------------------------Shipping Details------------------------------------------------->\n  <ion-item-divider color="danger" *ngIf="!billing_shipping_same" >Shipping Details</ion-item-divider>\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>Addres Line 1</ion-label>\n    <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.shipping_address.address_1"></ion-textarea>\n  </ion-item>\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>Addres Line 2</ion-label>\n    <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.shipping_address.address_2"></ion-textarea>\n  </ion-item>\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>Country</ion-label>\n    <ion-select [(ngModel)]="newUser.shipping_address.country">\n      <ion-option value="india" selected="true">India</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>State</ion-label>\n    <ion-select [(ngModel)]="newUser.shipping_address.state">\n      <ion-option value="Karnataka" selected="true">Karnataka</ion-option>\n      <ion-option value="Andhra Pradesh">Andhra Pradesh</ion-option>\n      <ion-option value="Tamil Nadu">Tamil nadu</ion-option>\n      <ion-option value="Kerala">Kerala</ion-option>\n    </ion-select>\n  </ion-item>\n\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>City</ion-label>\n    <ion-select [(ngModel)]="newUser.shipping_address.city">\n      <ion-option value="Bengaluru" selected="true">Bengaluru</ion-option>\n      <ion-option value="Amaravathi">Amaravathi</ion-option>\n      <ion-option value="Chennai">Chennai</ion-option>\n      <ion-option value="Kochi">Kochi</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>Postal Code</ion-label>\n    <ion-input type="number" clearInput="" [(ngModel)]="newUser.shipping_address.postcode"></ion-input>\n  </ion-item>\n\n  <ion-item *ngIf="!billing_shipping_same">\n    <ion-label>Phone</ion-label>\n    <ion-input type="number" clearInput="" [(ngModel)]="newUser.shipping_address.phone"></ion-input>\n  </ion-item>\n\n\n</ion-list>\n</ion-content>\n\n<ion-footer>\n  <button ion-button="" block color="danger" (click)="signup()">Sign Up</button>\n</ion-footer>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(366);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_products_by_category_products_by_category__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_product_details_product_details__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_cart_cart__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_test_test__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_checkout_checkout__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_paypal__ = __webpack_require__(340);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_products_by_category_products_by_category__["a" /* ProductsByCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_product_details_product_details__["a" /* ProductDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_checkout_checkout__["a" /* CheckoutPage */]
                /**/
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_products_by_category_products_by_category__["a" /* ProductsByCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_product_details_product_details__["a" /* ProductDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_checkout_checkout__["a" /* CheckoutPage */]
                //FormData
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_paypal__["a" /* PayPal */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__ = __webpack_require__(278);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__["a" /* MenuPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\app\app.html"*/'\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

/*
* */
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 432:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 465:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 466:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 533:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_woocommerce_api__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TestPage = (function () {
    function TestPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.wooCommerce = __WEBPACK_IMPORTED_MODULE_2_woocommerce_api__({
            url: "http://test.institucion.net/dani/wordpress",
            consumerKey: "ck_434b6c4f26006bd5f9d0ded29c92843bde95c854",
            consumerSecret: "cs_f9ddc5236f4264b6cf952485cdf7acd8046f1ad7"
        });
        this.wooCommerce.getAsync("products").then(function (data) {
            console.log(JSON.parse(data.body));
            _this.products = (JSON.parse(data.body)).products;
        }, function (error) { console.log(error); });
    }
    TestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TestPage');
    };
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test',template:/*ion-inline-start:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\test\test.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Test Page</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <h1>Welcome to WooCommerce store</h1>\n\n  <ion-card>\n    <ion-card-title>sdghfusadhgasuieyh</ion-card-title>\n    <ion-card-content>\n      <ion-list>\n        <ion-item *ngFor="let product of products">\n          <h1>{{product.title}}</h1>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n\n'/*ion-inline-end:"C:\xampp\htdocs\udemy\ShoppersStop\src\pages\test\test.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ })

},[344]);
//# sourceMappingURL=main.js.map