webpackJsonp([9],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuisinesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__homepage_homepage__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CuisinesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CuisinesListPage = (function () {
    function CuisinesListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cuisines = ['American', 'Chinese', 'Ethiopian', 'Korean', 'Indian',
            'Italian', 'Mediterranean', 'Vietnamese'];
    }
    CuisinesListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CuisinesListPage');
    };
    CuisinesListPage.prototype.openPage = function (item) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__homepage_homepage__["a" /* Homepage */], {
            item: item
        });
    };
    CuisinesListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cuisines-list',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\cuisines-list\cuisines-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Cuisines</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let cuisine of cuisines" (click)="openPage(cuisine)">\n\n      <h2>{{cuisine}}</h2>\n\n    </button>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\cuisines-list\cuisines-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], CuisinesListPage);
    return CuisinesListPage;
}());

//# sourceMappingURL=cuisines-list.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_summary_order_summary__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ItemDetailsPage = (function () {
    function ItemDetailsPage(navCtrl, navParams, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.item = this.navParams.get("item");
        this.restaurantId = this.navParams.get("restaurantId");
        this.quantity = 0;
        console.log(this.item.name);
    }
    ItemDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ItemDetailsPage');
        console.log(this.quantity);
    };
    ItemDetailsPage.prototype.addToCart = function (item, quantity) {
        var _this = this;
        var updatedOrder = {
            "id": 'null',
            "status": "NO_ORDER",
            "restaurantId": 'null',
            "itemsCosts": {},
            "itemsQuantities": {},
            "itemsPrices": {},
            "itemsNames": {},
        };
        console.log("add to cart clicked");
        // if(this.quantity > 0){
        this.storage.get("currentOrder").then(function (val) {
            updatedOrder = val;
            console.log('currentOrder', val);
            _this.storage.get('orderIdTemp').then(function (orderIdTemp) {
                if (val.status != "IP" || _this.restaurantId != val.restaurantId || orderIdTemp != val.id) {
                    console.log("UPDATING ORDER DETAILS");
                    // updatedOrder.id = Object.assign(orderIdTemp)
                    console.log("OrderIdTemp", orderIdTemp);
                    updatedOrder.id = Object.assign(orderIdTemp);
                    updatedOrder.status = "IP",
                        updatedOrder.restaurantId = _this.restaurantId,
                        updatedOrder.itemsCosts = {};
                    updatedOrder.itemsQuantities = {};
                    updatedOrder.itemsPrices = {};
                    updatedOrder.itemsNames = {};
                }
                updatedOrder.itemsCosts[item.menu_api_key] = _this.quantity * item.price;
                updatedOrder.itemsQuantities[item.menu_api_key] = _this.quantity;
                updatedOrder.itemsPrices[item.menu_api_key] = item.price;
                updatedOrder.itemsNames[item.menu_api_key] = item.name;
                _this.storage.set("currentOrder", updatedOrder);
                console.log('currentOrder', updatedOrder);
            });
        });
        // else{
        //   updatedOrder.itemsCosts=val.itemsCosts
        // }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */], this.restaurantId);
        // }
        // else{
        //   this.showAlert();
        // }
    };
    ItemDetailsPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Quantity Error',
            subTitle: 'Please specify quantity.',
            buttons: ['OK']
        });
        alert.present();
    };
    ItemDetailsPage.prototype.redirectToCart = function () {
        console.log("WIP - redirect to cart");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_summary_order_summary__["a" /* OrderSummaryPage */]);
    };
    ItemDetailsPage.prototype.redirectHomepage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__homepage_homepage__["a" /* Homepage */]);
    };
    ItemDetailsPage.prototype.plusOne = function () {
        this.quantity = this.quantity + 1;
    };
    ItemDetailsPage.prototype.minusOne = function () {
        if (this.quantity > 0) {
            this.quantity = this.quantity - 1;
        }
    };
    ItemDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-item-details',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\item-details\item-details.html"*/'<!--\n\n  Generated template for the ItemDetailsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="coeats-red">\n\n    <button ion-button clear (click)="redirectHomepage()">\n\n      <ion-title>COEATS</ion-title>\n\n    </button>\n\n    <ion-buttons end>\n\n        <button ion-button large (click)="redirectToCart()">\n\n          <ion-icon id="cart-icon" name="cart"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <div class="item-info" align="center">\n\n    <img *ngIf="item.img!=\'None\'" class=\'item-img\' src="{{item.img}}">\n\n\n\n    <h2>{{item.name}}</h2>\n\n\n\n    <p>\n\n      {{item.description}}\n\n    </p>\n\n    <p><b>${{item.price}}</b>\n\n\n\n    </p>\n\n  </div>\n\n  <!-- <div ng-controller="CounterCtrl" align="center"> -->\n\n  <div align="center">\n\n    <button ion-button clear (click)="minusOne()">\n\n      <ion-icon icon-start name="ios-remove-circle-outline" ></ion-icon>\n\n    </button>\n\n    <!-- {{ quantity == -1 ? 1 : quantity }} -->\n\n    {{quantity}}\n\n      <!-- {{item.quantity}} -->\n\n    <button ion-button clear (click)="plusOne()">\n\n      <ion-icon icon-end name="ios-add-circle-outline" ></ion-icon>\n\n    </button>\n\n  </div>\n\n\n\n  <div align="center" id="addToCart-div">\n\n    <button ion-button id="addToCart-button" (click)="addToCart(item, quantity)">Add to cart</button>\n\n  </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\item-details\item-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ItemDetailsPage);
    return ItemDetailsPage;
}());

// .controller("CounterCtrl", function($scope)){
//   $scope.quantity = this.quantity
//   $scope.plusOne = function(){
//     $scope.quantity++;
//   }
//   $scope.minusOne = function(){
//     if($scope.quantity>0){
//       $scope.quantity--;
//     }
//
//   }
// }
//# sourceMappingURL=item-details.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderConstraintsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_tracking_order_tracking__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






/**
 * Generated class for the OrderConstraintsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderConstraintsPage = (function () {
    function OrderConstraintsPage(navCtrl, navParams, storage, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.authService = authService;
        this.storage.get("currentOrder").then(function (val) {
            console.log(val);
            _this.orderId = Object.assign(val.id);
            if (_this.orderId != 'null') {
                var oidJson = { "oId": _this.orderId };
                _this.authService.getOrderStatus(oidJson).subscribe(function (orderStatus) {
                    _this.minPeople = Number(orderStatus['num_people_joined'].toFixed(0));
                    _this.maxTime = Number(orderStatus['time_remaining'].toFixed(0));
                });
            }
            else {
                // set default values
                _this.minPeople = 2;
                _this.maxTime = 15;
            }
        });
    }
    OrderConstraintsPage.prototype.plusOnePeople = function () {
        this.minPeople = this.minPeople + 1;
    };
    OrderConstraintsPage.prototype.minusOnePeople = function () {
        if (this.minPeople > 1) {
            this.minPeople = this.minPeople - 1;
        }
    };
    OrderConstraintsPage.prototype.plusOneTime = function () {
        this.maxTime = this.maxTime + 1;
    };
    OrderConstraintsPage.prototype.minusOneTime = function () {
        if (this.maxTime > 1) {
            this.maxTime = this.maxTime - 1;
        }
    };
    OrderConstraintsPage.prototype.initOrder = function (minPeople, maxTime) {
        var _this = this;
        console.log(minPeople, maxTime);
        var userId = "";
        this.storage.get("userId").then(function (data) {
            userId = Object.assign(data);
        });
        this.storage.get("currentOrder").then(function (currentOrder) {
            var restJson = { rest_api_key: currentOrder["restaurantId"], lat: 33.77439, lon: -84.39569 };
            _this.authService.getRestaurantDetails(restJson).subscribe(function (restaurant) {
                var itemsList = [];
                Object.keys(currentOrder.itemsCosts).forEach(function (key) {
                    var item = { item_api_key: key, item_price: currentOrder.itemsCosts[key] };
                    itemsList.push(Object.assign({}, item));
                });
                var json = { duration: maxTime, rest_api_key: currentOrder.restaurantId,
                    rest_name: restaurant["name"], lat: restJson.lat, lon: restJson.lon,
                    username: userId, min_people: minPeople, min_amount: restaurant["min_delivery_price"],
                    item_list: itemsList
                };
                console.log(json);
                _this.authService.initJoin(json).subscribe(function (data) {
                    console.log("INIT JOIN");
                    console.log(data);
                    currentOrder.id = Object.assign(data["oId"]);
                    currentOrder.status = "DONE";
                    _this.storage.set('currentOrder', currentOrder);
                    _this.storage.set('trackingOrderId', data["oId"]);
                    console.log(currentOrder);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_tracking_order_tracking__["a" /* OrderTrackingPage */], data["oId"]);
                });
            });
        });
    };
    OrderConstraintsPage.prototype.joinOrder = function (orderId) {
        var _this = this;
        var userId = "";
        this.storage.get("userId").then(function (data) {
            userId = Object.assign(data);
        });
        this.storage.get("currentOrder").then(function (currentOrder) {
            var itemsList = [];
            Object.keys(currentOrder.itemsCosts).forEach(function (key) {
                var item = { item_api_key: key, item_price: currentOrder.itemsCosts[key] };
                itemsList.push(Object.assign({}, item));
            });
            var json = { oId: currentOrder.id, username: userId, item_list: itemsList };
            _this.authService.joinOrder(json).subscribe(function (data) {
                console.log("JOIN ORDER");
                console.log(data);
            });
        });
        this.storage.set('trackingOrderId', orderId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_tracking_order_tracking__["a" /* OrderTrackingPage */], orderId);
    };
    OrderConstraintsPage.prototype.redirectHomepage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__homepage_homepage__["a" /* Homepage */]);
    };
    OrderConstraintsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderConstraintsPage');
    };
    OrderConstraintsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order-constraints',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\order-constraints\order-constraints.html"*/'<!--\n\n  Generated template for the OrderConstraintsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="coeats-red">\n\n    <button ion-button clear (click)="redirectHomepage()">\n\n      <ion-title>COEATS</ion-title>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <div class="item-info" align="center">\n\n    <h2>Order Preferences</h2>\n\n  </div>\n\n\n\n  <div align="center">\n\n    Number of Joiners (min):\n\n    <button *ngIf="orderId==\'null\'" ion-button clear (click)="minusOnePeople()">\n\n      <ion-icon icon-start name="ios-remove-circle-outline" ></ion-icon>\n\n    </button>\n\n    <!-- {{ quantity == -1 ? 1 : quantity }} -->\n\n    {{minPeople}}\n\n      <!-- {{item.quantity}} -->\n\n    <button *ngIf="orderId==\'null\'" ion-button clear (click)="plusOnePeople()">\n\n      <ion-icon icon-end name="ios-add-circle-outline" ></ion-icon>\n\n    </button>\n\n  </div>\n\n\n\n  <div align="center">\n\n    Wait Time (max):\n\n    <button *ngIf="orderId==\'null\'" ion-button clear (click)="minusOneTime()">\n\n      <ion-icon icon-start name="ios-remove-circle-outline" ></ion-icon>\n\n    </button>\n\n    <!-- {{ quantity == -1 ? 1 : quantity }} -->\n\n    {{maxTime}} min\n\n      <!-- {{item.quantity}} -->\n\n    <button *ngIf="orderId==\'null\'" ion-button clear (click)="plusOneTime()">\n\n      <ion-icon icon-end name="ios-add-circle-outline" ></ion-icon>\n\n    </button>\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <button *ngIf="orderId==\'null\'" ion-button id="order-button" (click)="initOrder(minPeople, maxTime)">Create Order</button>\n\n    <button *ngIf="orderId!=\'null\'" ion-button id="order-button" (click)="joinOrder(orderId)">Join Order</button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\order-constraints\order-constraints.html"*/,
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], OrderConstraintsPage);
    return OrderConstraintsPage;
}());

//# sourceMappingURL=order-constraints.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderTrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





/**
 * Generated class for the OrderTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderTrackingPage = (function () {
    function OrderTrackingPage(navCtrl, navParams, storage, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.authService = authService;
        this.orderId = this.navParams.data;
        console.log(this.orderId);
        console.log(this.navParams.data);
        if (this.navParams.data = {}) {
            console.log("EMPTY");
            this.storage.get("trackingOrderId").then(function (val) {
                _this.orderId = Object.assign(val);
                var oidJson = { "oId": _this.orderId };
                _this.authService.getOrderStatus(oidJson).subscribe(function (orderStatus) {
                    _this.status = orderStatus["status"];
                    if (orderStatus["Executed"] == "False") {
                        _this.action = "Cancelled";
                    }
                    else {
                        _this.action = "Executed";
                    }
                    _this.peopleJoined = orderStatus['num_people_joined'];
                    _this.minPeople = orderStatus['min_people'];
                    _this.timeRemaning = Number(orderStatus['time_remaining'].toFixed(0));
                    _this.currentAmount = orderStatus['total_amount'];
                    _this.minAmount = orderStatus['min_amount'];
                });
            });
        }
        else {
            var oidJson = { "oId": this.orderId };
            this.authService.getOrderStatus(oidJson).subscribe(function (orderStatus) {
                _this.status = orderStatus["status"];
                if (orderStatus["Executed"] == "False") {
                    _this.action = "Cancelled";
                }
                else {
                    _this.action = "Executed";
                }
                _this.peopleJoined = orderStatus['num_people_joined'];
                _this.minPeople = orderStatus['min_people'];
                _this.timeRemaning = Number(orderStatus['time_remaining'].toFixed(0));
                _this.currentAmount = orderStatus['total_amount'];
                _this.minAmount = orderStatus['min_amount'];
                _this.storage.set('trackingOrderId', _this.orderId);
            });
        }
    }
    OrderTrackingPage_1 = OrderTrackingPage;
    OrderTrackingPage.prototype.redirectHomepage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__homepage_homepage__["a" /* Homepage */]);
    };
    OrderTrackingPage.prototype.refresh = function () {
        this.navCtrl.push(OrderTrackingPage_1);
    };
    OrderTrackingPage = OrderTrackingPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order-tracking',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\order-tracking\order-tracking.html"*/'<!--\n  Generated template for the OrderTrackingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="coeats-red">\n    <button ion-button clear (click)="redirectHomepage()">\n      <ion-title>COEATS</ion-title>\n    </button>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="item-info" align="center">\n    <h2>Order Tracking</h2>\n  </div>\n\n  <div class=\'restaurant-name\' align="center">\n    <h4>Order ID: {{orderId}}</h4>\n    <h5 *ngIf="status==\'IP\'">Status: Waiting for people to join</h5>\n    <h5 *ngIf="status==\'F\'">Status: Order {{this.action}}</h5>\n  </div>\n\n  <div align="center">\n    <p>\n      Number of people joined: {{peopleJoined}} / {{minPeople}}\n    </p>\n    <p>\n      Time Remaining: {{timeRemaning}} min\n    </p>\n    <p>\n      Order Amount ($): {{currentAmount}} / {{minAmount}}\n    </p>\n  </div>\n\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <button *ngIf="orderId!=\'null\'" ion-button id="order-button" (click)="refresh()">Refresh</button>\n    <button *ngIf="orderId!=\'null\'" ion-button id="order-button" (click)="redirectHomepage()">OK</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\order-tracking\order-tracking.html"*/,
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], OrderTrackingPage);
    return OrderTrackingPage;
    var OrderTrackingPage_1;
}());

//# sourceMappingURL=order-tracking.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__homepage_homepage__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, nav, formBuilder, alertCtrl, storage, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.authService = authService;
        this.credentialsForm = this.formBuilder.group({
            userId: [''],
            password: [''],
            first_name: [''],
            last_name: [''],
            email: [''],
            phone_number: ['']
        });
    }
    SignupPage.prototype.createUser = function () {
        var _this = this;
        this.authService.createUser(this.credentialsForm.value).subscribe(function (data) {
            console.log(data);
            _this.result = data['result'];
            console.log(_this.result);
            if (_this.result == "OK") {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__homepage_homepage__["a" /* Homepage */]);
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__homepage_homepage__["a" /* Homepage */]);
                _this.storage.set('userId', _this.credentialsForm.value.userId);
            }
            else {
                _this.showAlert();
            }
        });
    };
    SignupPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Sign Up Error',
            subTitle: 'Check your inputs and please try again.',
            buttons: ['OK']
        });
        alert.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\signup\signup.html"*/'<!--\n\n  Generated template for the SignupPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Sign Up</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <div class="signup-box" center>\n\n    <form [formGroup]="credentialsForm" (ngSubmit)="createUser()">\n\n      <ion-item>\n\n        <ion-input formControlName="userId" type="text" value="" placeholder="Username"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-input formControlName="email" type="text" value="" placeholder="email@email.com"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-input formControlName="password" type="password" placeholder="Password"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-input type="password" placeholder="Repeat Password"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-input formControlName="first_name" type="text" placeholder="First Name"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-input formControlName="last_name" type="text" placeholder="Last Name"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-input formControlName="phone_number" type="text" placeholder="Phone"></ion-input>\n\n      </ion-item>\n\n      <ion-row class="row-submit" center>\n\n        <div padding class="div-submit-button center">\n\n          <button ion-button full type="submit" color="coeats-red">Sign Up</button>\n\n        </div>\n\n      </ion-row>\n\n    </form>\n\n  </div>\n\n\n\n  <h1 class=\'coeats-title\'>\n\n     COEATS\n\n  </h1>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\signup\signup.html"*/,
        }),
        __param(6, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








/**
 * Generated class for the SearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchResultsPage = (function () {
    function SearchResultsPage(navCtrl, navParams, geolocation, storage, alertCtrl, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.query = this.navParams.data;
        this.options = {
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(this.options).then(function (pos) {
            console.log(pos);
            console.log(pos.coords);
            _this.currentGeo = { distance: 10, lat: pos.coords.latitude, lon: pos.coords.longitude };
        }, function (err) {
            console.log("error : " + err.message);
        });
        var query_geo = { query: this.query, lat: 33.77439, lon: -84.39569 };
        console.log(query_geo);
        this.authService.getRestaurantsList(query_geo).subscribe(function (restaurantsList) {
            _this.restaurants = [];
            console.log(restaurantsList);
            console.log(restaurantsList["restaurants"]);
            var deepCopy = Object.assign([], restaurantsList["restaurants"]);
            console.log(deepCopy);
            _this.restaurants = deepCopy;
            console.log(_this.restaurants);
        });
    }
    SearchResultsPage.prototype.itemTapped = function (event, order) {
        console.log("homepage");
        // console.log(restaurant.restName);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */], order.restId);
        this.storage.set("orderIdTemp", order.id);
        console.log("ORDERIDTEMP", order.id);
    };
    SearchResultsPage.prototype.restTapped = function (event, restaurant) {
        console.log("homepage");
        // console.log(restaurant.restName);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */], restaurant.rest_api_key);
        this.storage.set("orderIdTemp", 'null');
    };
    SearchResultsPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    SearchResultsPage.prototype.redirectHomepage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__homepage_homepage__["a" /* Homepage */]);
    };
    SearchResultsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-results',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\search-results\search-results.html"*/'<!--\n  Generated template for the SearchResultsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="coeats-red">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <button ion-button clear (click)="redirectHomepage()">\n      <ion-title>COEATS</ion-title>\n    </button>\n    <ion-buttons end>\n        <button ion-button (click)="login()" color="light">\n          Log in\n          <!-- <ion-icon name="options"></ion-icon> -->\n        </button>\n    </ion-buttons>\n      <!-- <button ion-button (click)="signup()" color="light" end>Sign Up</button> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h5 color="grey">Restaurants</h5>\n\n  <ion-list>\n    <button ion-item *ngFor="let item of restaurants" (click)="restTapped($event, item)">\n      <ion-thumbnail class="thumbnail" item-start>\n        <img class="thumbnail-img" src={{item.logo}}>\n      </ion-thumbnail>\n      <h2>{{item.name}}</h2>\n      <p *ngIf="item.open==true">\n        Open\n      </p>\n      <p *ngIf="item.open!=true">\n        Closed\n      </p>\n      <ion-note item-end>\n        <p>\n          <ion-icon name="time"></ion-icon>\n          min {{item.min_wait_time}}\n        </p>\n        <p>\n          <ion-icon name="time"></ion-icon>\n          max {{item.max_wait_time}}\n        </p>\n     </ion-note>\n    </button>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\search-results\search-results.html"*/,
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], SearchResultsPage);
    return SearchResultsPage;
}());

//# sourceMappingURL=search-results.js.map

/***/ }),

/***/ 125:
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
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cuisines-list/cuisines-list.module": [
		293,
		8
	],
	"../pages/item-details/item-details.module": [
		294,
		7
	],
	"../pages/login/login.module": [
		295,
		6
	],
	"../pages/order-constraints/order-constraints.module": [
		296,
		5
	],
	"../pages/order-summary/order-summary.module": [
		297,
		4
	],
	"../pages/order-tracking/order-tracking.module": [
		298,
		3
	],
	"../pages/restaurant-menu/restaurant-menu.module": [
		299,
		2
	],
	"../pages/search-results/search-results.module": [
		300,
		1
	],
	"../pages/signup/signup.module": [
		301,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Homepage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_results_search_results__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var Homepage = (function () {
    // items: any[];
    function Homepage(navCtrl, navParams, geolocation, storage, alertCtrl, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.openOrders = [];
        this.restaurants = [];
        this.options = {
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(this.options).then(function (pos) {
            console.log(pos);
            console.log(pos.coords);
            _this.currentGeo = { distance: 10, lat: pos.coords.latitude, lon: pos.coords.longitude };
        }, function (err) {
            console.log("error : " + err.message);
        });
        // TODO: use real geolocation
        this.currentGeo = { distance: 10, lat: 33.77439, lon: -84.39569 };
        console.log(this.currentGeo);
        this.authService.getJoinList(this.currentGeo).subscribe(function (data) {
            // this.result = data['result'];
            _this.openOrders = [];
            console.log(data);
            console.log(data['result']);
            if (data['result'] == "OK") {
                console.log(data['orderList']);
                var currentOrder = {
                    "id": 'null',
                    "restId": 'null',
                    "restName": 'null',
                    "restImg": '../../assets/imgs/restaurant.jpg',
                    "lat": 0,
                    "lon": 0,
                    "foodTypes": [],
                    "distance": 0,
                    "distMeasure": 'null',
                    "time": 0,
                    "njoined": 0,
                    "minPeople": 0
                };
                var _loop_1 = function (order) {
                    oidJson = { "oId": order.oId };
                    _this.authService.getOrderStatus(oidJson).subscribe(function (orderStatus) {
                        var restJson = { rest_api_key: order.rest_api_key, lat: 33.77439, lon: -84.39569 };
                        _this.authService.getRestaurantDetails(restJson).subscribe(function (restDetails) {
                            // gettng all info from get_join_list
                            currentOrder.id = order.oId;
                            currentOrder.restId = order.rest_api_key;
                            currentOrder.restName = order.rest_name;
                            currentOrder.restImg = restDetails["logo"];
                            currentOrder.lat = order.lat;
                            currentOrder.lon = order.lon;
                            currentOrder.foodTypes = order.foodTypes;
                            currentOrder.distance = order.distance * 0.621371; // to miles
                            currentOrder.distMeasure = "miles";
                            if (currentOrder.distance < 0.1) {
                                currentOrder.distance *= 5280;
                                currentOrder.distMeasure = "feet";
                            }
                            currentOrder.distance = Number(currentOrder.distance.toFixed(2));
                            // gettng all info from get_order_status
                            currentOrder.njoined = Number(orderStatus['num_people_joined'].toFixed(0));
                            currentOrder.time = Number(orderStatus['time_remaining'].toFixed(0));
                            currentOrder.minPeople = orderStatus['min_people'];
                            var deepCopy = Object.assign({}, currentOrder);
                            _this.openOrders.push(deepCopy);
                            console.log(_this.openOrders);
                        });
                    });
                };
                var oidJson;
                for (var _i = 0, _a = data['orderList']; _i < _a.length; _i++) {
                    var order = _a[_i];
                    _loop_1(order);
                }
            }
            else {
                _this.showAlert();
            }
        });
        var query_geo = { query: ' ', lat: 33.77439, lon: -84.39569 };
        console.log(query_geo);
        this.authService.getRestaurantsList(query_geo).subscribe(function (restaurantsList) {
            _this.restaurants = [];
            console.log(restaurantsList);
            console.log(restaurantsList["restaurants"]);
            var deepCopy = Object.assign([], restaurantsList["restaurants"]);
            console.log(deepCopy);
            _this.restaurants = deepCopy;
            console.log(_this.restaurants);
        });
        console.log(this.restaurants);
    }
    Homepage_1 = Homepage;
    Homepage.prototype.onSearch = function (ev) {
        console.log(ev.target.value);
        var query = ev.target.value;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__search_results_search_results__["a" /* SearchResultsPage */], query);
    };
    Homepage.prototype.itemTapped = function (event, order) {
        console.log("homepage");
        // console.log(restaurant.restName);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */], order.restId);
        this.storage.set("orderIdTemp", order.id);
        console.log("ORDERIDTEMP", order.id);
    };
    Homepage.prototype.restTapped = function (event, restaurant) {
        console.log("homepage");
        // console.log(restaurant.restName);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */], restaurant.rest_api_key);
        this.storage.set("orderIdTemp", 'null');
    };
    Homepage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    Homepage.prototype.ionViewDidEnter = function () {
    };
    Homepage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Loading Error',
            subTitle: 'Oops, there has been an error retrieving orders. Please refresh.',
            buttons: ['OK']
        });
        alert.present();
    };
    Homepage.prototype.redirectHomepage = function () {
        this.navCtrl.setRoot(Homepage_1);
    };
    Homepage = Homepage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-homepage',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\homepage\homepage.html"*/'<ion-header>\n\n  <ion-navbar color="coeats-red">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <button ion-button clear (click)="redirectHomepage()">\n\n      <ion-title>COEATS</ion-title>\n\n    </button>\n\n    <ion-buttons end>\n\n        <button ion-button (click)="login()" color="light">\n\n          Log in\n\n          <!-- <ion-icon name="options"></ion-icon> -->\n\n        </button>\n\n    </ion-buttons>\n\n      <!-- <button ion-button (click)="signup()" color="light" end>Sign Up</button> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <ion-searchbar [(ngModel)]="myInput" [showCancelButton]="shouldShowCancel"\n\n    (search)="onSearch($event)">\n\n  </ion-searchbar>\n\n\n\n  <!-- OPEN ORD ERS -->\n\n\n\n  <h5 color="grey">Open Orders Near You</h5>\n\n\n\n  <ion-list>\n\n\n\n    <button ion-item *ngFor="let item of openOrders" (click)="itemTapped($event, item)">\n\n      <ion-thumbnail *ngIf="item.restImg!=\'null\'" class="thumbnail" item-start>\n\n        <img class="thumbnail-img" src="{{item.restImg}}">\n\n      </ion-thumbnail>\n\n      <h2>{{item.restName}}</h2>\n\n      <p>\n\n        {{item.foodTypes}}\n\n      </p>\n\n      <p>\n\n         {{item.distance}} {{item.distMeasure}}\n\n      </p>\n\n\n\n      <ion-note item-end>\n\n        <p>\n\n          <ion-icon name="time"></ion-icon>\n\n          {{item.time}} min\n\n        </p>\n\n        <p>\n\n          <ion-icon name="person"></ion-icon>\n\n          {{item.njoined}} / {{item.minPeople}}\n\n        </p>\n\n       </ion-note>\n\n    </button>\n\n  </ion-list>\n\n\n\n\n\n  <!-- RESTAURANTS -->\n\n\n\n  <h5 color="grey">Restaurants Near You</h5>\n\n\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of restaurants" (click)="restTapped($event, item)">\n\n      <ion-thumbnail class="thumbnail" item-start>\n\n        <img class="thumbnail-img" src={{item.logo}}>\n\n      </ion-thumbnail>\n\n      <h2>{{item.name}}</h2>\n\n      <p *ngIf="item.open==true">\n\n        Open\n\n      </p>\n\n      <p *ngIf="item.open!=true">\n\n        Closed\n\n      </p>\n\n      <ion-note item-end>\n\n        <p>\n\n          <ion-icon name="time"></ion-icon>\n\n          min {{item.min_wait_time}}\n\n        </p>\n\n        <p>\n\n          <ion-icon name="time"></ion-icon>\n\n          max {{item.max_wait_time}}\n\n        </p>\n\n     </ion-note>\n\n    </button>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\homepage\homepage.html"*/
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], Homepage);
    return Homepage;
    var Homepage_1;
}());

//# sourceMappingURL=homepage.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restaurants = [];
        for (var i = 6; i < 11; i++) {
            this.restaurants.push({
                title: 'Restaurant ' + i,
                stars: Math.floor(Math.random() * 50) / 10,
                dollars: Math.floor(Math.random() * 3) + 1,
                time: Math.floor(Math.random() * 30) + 1,
                njoined: Math.floor(Math.random() * 5) + 1,
                img: '../../assets/imgs/restaurant.jpg'
                // title: 'Restaurant ' + i, stars: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, restaurant) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */], {
            restaurant: restaurant
        });
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Restaurants</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of restaurants" (click)="itemTapped($event, item)">\n\n      <ion-thumbnail item-start>\n\n        <img src="../../assets/imgs/restaurant.jpg">\n\n      </ion-thumbnail>\n\n      <h2>{{item.title}}</h2>\n\n\n\n    </button>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(234);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { HttpModule } from '@angular/http';
// import 'rxjs/add/operator/map'

// import { NgModule } from '@angular/core'
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// let
var aws = 'ec2-18-188-100-25.us-east-2.compute.amazonaws.com:5000';
var apiUrl = 'http://' + aws + '/API/verifyUser';
// let apiUrl = "http://ec2-13-58-175-90.us-east-2.compute.amazonaws.com:5000/API/verifyUser";
var apiGetJoinListUrl = 'http://' + aws + '/API/get_join_list';
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        console.log('Hello AuthServiceProvider Provider');
        // this.headers = new HttpHeaders(
        //   {"Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
        //   "Accept":"application/json",
        //   "Content-Type":"application/json",
        //   "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin"
        //   }
        // )
        // console.log(this.headers)
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers = {'Access-Control-Allow-Origin':'htt://site allowed to access'};
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
    }
    AuthServiceProvider.prototype.verifyLogin = function (credentials) {
        if (credentials === void 0) { credentials = {}; }
        console.log(credentials);
        return this.http.post(apiUrl, JSON.stringify(credentials), { headers: this.headers });
    };
    AuthServiceProvider.prototype.getJoinList = function (geolocation) {
        if (geolocation === void 0) { geolocation = {}; }
        return this.http.post(apiGetJoinListUrl, JSON.stringify(geolocation), { headers: this.headers });
    };
    AuthServiceProvider.prototype.getOrderStatus = function (orderId) {
        if (orderId === void 0) { orderId = {}; }
        var apiGetOrderStatus = 'http://' + aws + '/API/get_order_status';
        return this.http.post(apiGetOrderStatus, JSON.stringify(orderId), { headers: this.headers });
    };
    AuthServiceProvider.prototype.getMenus = function (restId) {
        if (restId === void 0) { restId = {}; }
        var apiUrl = 'http://' + aws + '/API/get_menus';
        return this.http.post(apiUrl, JSON.stringify(restId), { headers: this.headers });
    };
    AuthServiceProvider.prototype.getRestaurantDetails = function (restId_location) {
        if (restId_location === void 0) { restId_location = {}; }
        var apiUrl = 'http://' + aws + '/API/get_restaurant_detail';
        return this.http.post(apiUrl, JSON.stringify(restId_location), { headers: this.headers });
    };
    AuthServiceProvider.prototype.getRestaurantsList = function (query_location) {
        if (query_location === void 0) { query_location = {}; }
        var apiUrl = 'http://' + aws + '/API/get_restaurants';
        return this.http.post(apiUrl, JSON.stringify(query_location), { headers: this.headers });
    };
    AuthServiceProvider.prototype.initJoin = function (json) {
        if (json === void 0) { json = {}; }
        var apiUrl = 'http://' + aws + '/API/init_join';
        return this.http.post(apiUrl, JSON.stringify(json), { headers: this.headers });
    };
    AuthServiceProvider.prototype.joinOrder = function (json) {
        if (json === void 0) { json = {}; }
        var apiUrl = 'http://' + aws + '/API/join';
        return this.http.post(apiUrl, JSON.stringify(json), { headers: this.headers });
    };
    AuthServiceProvider.prototype.createUser = function (json) {
        if (json === void 0) { json = {}; }
        var apiUrl = 'http://' + aws + '/API/createUser';
        return this.http.post(apiUrl, JSON.stringify(json), { headers: this.headers });
    };
    AuthServiceProvider.prototype.getUserInfo = function (json) {
        if (json === void 0) { json = {}; }
        var apiUrl = 'http://' + aws + '/API/get_user_info';
        return this.http.post(apiUrl, JSON.stringify(json), { headers: this.headers });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_restaurant_menu_restaurant_menu__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_list_list__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_cuisines_list_cuisines_list__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_item_details_item_details__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_order_summary_order_summary__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_order_constraints_order_constraints__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_order_tracking_order_tracking__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_search_results_search_results__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_auth_service_auth_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { HttpModule } from '@angular/http';

// import { HttpModule } from '@angular/http';

















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_homepage_homepage__["a" /* Homepage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_cuisines_list_cuisines_list__["a" /* CuisinesListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_item_details_item_details__["a" /* ItemDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_order_summary_order_summary__["a" /* OrderSummaryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_order_constraints_order_constraints__["a" /* OrderConstraintsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_order_tracking_order_tracking__["a" /* OrderTrackingPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_search_results_search_results__["a" /* SearchResultsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                // HttpModule,
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                // HttpClient,
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/cuisines-list/cuisines-list.module#CuisinesListPageModule', name: 'CuisinesListPage', segment: 'cuisines-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/item-details/item-details.module#ItemDetailsPageModule', name: 'ItemDetailsPage', segment: 'item-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-constraints/order-constraints.module#OrderConstraintsPageModule', name: 'OrderConstraintsPage', segment: 'order-constraints', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-summary/order-summary.module#OrderSummaryPageModule', name: 'OrderSummaryPage', segment: 'order-summary', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-tracking/order-tracking.module#OrderTrackingPageModule', name: 'OrderTrackingPage', segment: 'order-tracking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/restaurant-menu/restaurant-menu.module#RestaurantMenuPageModule', name: 'RestaurantMenuPage', segment: 'restaurant-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-results/search-results.module#SearchResultsPageModule', name: 'SearchResultsPage', segment: 'search-results', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_homepage_homepage__["a" /* Homepage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_restaurant_menu_restaurant_menu__["a" /* RestaurantMenuPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_cuisines_list_cuisines_list__["a" /* CuisinesListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_item_details_item_details__["a" /* ItemDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_order_summary_order_summary__["a" /* OrderSummaryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_order_constraints_order_constraints__["a" /* OrderConstraintsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_order_tracking_order_tracking__["a" /* OrderTrackingPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_search_results_search_results__["a" /* SearchResultsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_list_list__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_cuisines_list_cuisines_list__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(211);
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
    function MyApp(platform, menu, menuCuisines, statusBar, splashScreen, toastCtrl, storage) {
        this.platform = platform;
        this.menu = menu;
        this.menuCuisines = menuCuisines;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        // make HelloIonicPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_homepage_homepage__["a" /* Homepage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [];
        this.pages.push({
            title: 'Home ',
            icon: 'home',
            component: __WEBPACK_IMPORTED_MODULE_3__pages_homepage_homepage__["a" /* Homepage */]
        });
        this.pages.push({
            title: 'Cuisines',
            icon: 'restaurant',
            component: __WEBPACK_IMPORTED_MODULE_6__pages_cuisines_list_cuisines_list__["a" /* CuisinesListPage */]
        });
        this.pages.push({
            title: 'My Orders',
            icon: 'list-box',
            component: __WEBPACK_IMPORTED_MODULE_4__pages_list_list__["a" /* ListPage */]
        });
        this.pages.push({
            title: 'Settings',
            icon: 'settings',
            component: __WEBPACK_IMPORTED_MODULE_4__pages_list_list__["a" /* ListPage */]
        });
        this.pages.push({
            title: 'Logout',
            icon: 'exit',
            component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]
        });
        // this.pages = [
        //   { title: 'Home', component: Homepage},
        //   { title: 'American', component: ListPage },
        //   { title: 'Chinese', component: ListPage },
        //   { title: 'Japanese', component: ListPage },
        //   { title: 'Logout', component: LoginPage}
        //
        // ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            //back button handle
            //Registration of push in Android and Windows Phone
            var lastTimeBackPress = 0;
            var timePeriodToExit = 2000;
            var currentOrder = {
                "id": 'null',
                "status": "NO_ORDER",
                "restaurantId": 'null',
                "itemsCosts": {},
                "itemsQuantities": {},
                "itemsPrices": {},
                "itemsNames": {},
                "items": [],
            };
            _this.storage.set('currentOrder', currentOrder);
            _this.platform.registerBackButtonAction(function () {
                // get current active page
                var view = _this.nav.getActive();
                if (view.component.name == "TabsPage") {
                    //Double check to exit app
                    if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                        _this.platform.exitApp(); //Exit from app
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'Press back again to exit App?',
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                        lastTimeBackPress = new Date().getTime();
                    }
                }
                else {
                    // go to previous page
                    _this.nav.pop();
                    // this.nav.backHistory();
                    // navigator.app.backHistory();
                }
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.menuCuisines.close();
        // navigate to the new page if it is not the current page
        if (page.title == 'Cuisines') {
            this.nav.push(page.component);
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    MyApp.prototype.redirectPage = function (page) {
        this.menu.close();
        this.nav.push(page.component);
        // this.navCtrl.push(ItemDetailsPage, {
        //   item: item
        // });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\app\app.html"*/'<ion-menu [content]="content">\n\n\n\n  <ion-header>\n\n    <!-- <ion-toolbar> -->\n\n      <!-- <ion-title>Cuisines</ion-title> -->\n\n    <!-- </ion-toolbar> -->\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <div class="item item-avatar">\n\n      <ion-item class="my-account">\n\n        <ion-avatar item-start class="my-avatar">\n\n          <img src="../assets/imgs/restaurant.jpg">\n\n          <!-- <ion-icon name="contact"></ion-icon> -->\n\n        </ion-avatar>\n\n        <h2>My Account</h2>\n\n      </ion-item>\n\n    </div>\n\n\n\n    <ion-list class="menu-list">\n\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n          <ion-icon name="{{p.icon}}" item-left></ion-icon>\n\n          <h2>{{p.title}}</h2>\n\n          <ion-icon *ngIf="p.title==\'Cuisines\'" name="ios-arrow-forward-outline" item-right></ion-icon>\n\n      </button>\n\n\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__item_details_item_details__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_summary_order_summary__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








/**
 * Generated class for the RestaurantMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RestaurantMenuPage = (function () {
    function RestaurantMenuPage(navCtrl, navParams, geolocation, storage, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.storage = storage;
        this.authService = authService;
        this.restaurant = {
            id: '',
            name: '',
            img: '../../assets/imgs/logo.png',
            items: []
        };
        this.currentGeo = {
            distance: 0,
            lat: 0,
            lon: 0
        };
        this.geolocation.getCurrentPosition(this.options).then(function (pos) {
            console.log(pos);
            console.log(pos.coords);
            var tempGeo = { distance: 10, lat: pos.coords.latitude, lon: pos.coords.longitude };
            console.log(tempGeo);
            _this.currentGeo = Object.assign({}, tempGeo);
            console.log(_this.currentGeo);
        }, function (err) {
            console.log("error : " + err.message);
        });
        var restId = this.navParams.data;
        this.currentGeo = { distance: 10, lat: 33.77439, lon: -84.39569 };
        var restDetailsJson = { rest_api_key: restId, lat: this.currentGeo.lat, lon: this.currentGeo.lon };
        console.log(restDetailsJson);
        var restIdJson = { "rest_api_key": restId };
        this.authService.getRestaurantDetails(restDetailsJson).subscribe(function (restDetails) {
            var restaurantTemp = {
                "id": 'null',
                "name": 'null',
                "img": '../../assets/imgs/restaurant.jpg',
                "items": []
            };
            restaurantTemp.name = restDetails['name'];
            restaurantTemp.img = restDetails['logo'];
            console.log(restDetails);
            console.log(restaurantTemp.img);
            _this.authService.getMenus(restIdJson).subscribe(function (data) {
                // TODO: check result
                restaurantTemp.id = restId;
                restaurantTemp.items = data["menus"];
                // var deepCopy = Object.assign({}, restaurantTemp);
                var deepCopy = Object.assign({}, restaurantTemp);
                _this.restaurant = deepCopy;
            });
        });
    }
    RestaurantMenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad RestaurantMenuPage');
        this.storage.get('userId').then(function (data) {
            _this.userId = data;
            console.log("userId", _this.userId);
        });
    };
    RestaurantMenuPage.prototype.redirectHomepage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__homepage_homepage__["a" /* Homepage */]);
    };
    RestaurantMenuPage.prototype.itemTapped = function (item, restaurant) {
        console.log(restaurant);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__item_details_item_details__["a" /* ItemDetailsPage */], { item: item, restaurantId: restaurant.id });
    };
    RestaurantMenuPage.prototype.redirectToCart = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__order_summary_order_summary__["a" /* OrderSummaryPage */]);
    };
    RestaurantMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-restaurant-menu',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\restaurant-menu\restaurant-menu.html"*/'<!--\n\n  Generated template for the RestaurantMenuPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="coeats-red">\n\n    <button ion-button clear (click)="redirectHomepage()">\n\n      <ion-title>COEATS</ion-title>\n\n    </button>\n\n    <ion-buttons end>\n\n        <button ion-button large (click)="redirectToCart()">\n\n          <ion-icon id="cart-icon" name="cart"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class=\'restaurant-info\' *ngIf="restaurant">\n\n    <img class=\'restaurant-img\' src="{{restaurant.img}}">\n\n    <div class="centered">\n\n      <h1>{{restaurant.name}}</h1>\n\n      <p>Open hours: 12pm - 10pm</p>\n\n      <p>(404) 123-4567</p>\n\n    </div>\n\n  </div>\n\n  <!-- {{restaurant.items}} -->\n\n  <ion-list>\n\n\n\n    <button ion-item *ngFor="let item of restaurant.items" (click)="itemTapped(item, restaurant)">\n\n      <!-- <ion-thumbnail *ngIf="item.img!=\'None\'" item-start>\n\n        <img src={{item.img}} />\n\n      </ion-thumbnail> -->\n\n      <h3>{{item.name}}</h3>\n\n      <p>{{item.description}}</p>\n\n      <ion-note class=\'note-right\' item-end>\n\n        <p color=black>\n\n          $ {{item.price}}\n\n        </p>\n\n      </ion-note>\n\n    </button>\n\n\n\n  </ion-list>\n\n\n\n  <!-- <div align="center"> -->\n\n\n\n\n\n    <!-- <button ion-button icon-start (click)="test()"> -->\n\n      <!-- Single Order -->\n\n    <!-- </button> -->\n\n\n\n    <!-- <button ion-button icon-end (click)="test()"> -->\n\n      <!-- Group Order -->\n\n    <!-- </button> -->\n\n  <!-- </div> -->\n\n\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <button ion-button id="checkout-button" (click)="redirectToCart()">Checkout</button>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\restaurant-menu\restaurant-menu.html"*/,
        }),
        __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], RestaurantMenuPage);
    return RestaurantMenuPage;
}());

//# sourceMappingURL=restaurant-menu.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


// import { Http, Headers, HttpModule } from '@angular/http'





// import { Observable } from 'rxjs/rx';
// import { Subscription } from 'rxjs/Rx';
// import { ListPage } from '../list/list';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    // loginData = { username:'', password:'' };
    // credentialsForm = { username:'', password:''}
    function LoginPage(navCtrl, navParams, nav, formBuilder, alertCtrl, authService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.storage = storage;
        // result: Observable <any>;
        // fake_credentials = { userId:'test_user', password:'test_password'}
        this.fake_credentials = { userId: 'ppp', password: 'ppp' };
        this.credentials = { userId: '', password: '' };
        this.credentialsForm = this.formBuilder.group({
            userId: [''],
            password: [''],
        });
    }
    LoginPage.prototype.verifyLogin = function () {
        var _this = this;
        this.authService.verifyLogin(this.credentialsForm.value).subscribe(function (data) {
            _this.result = data['result'];
            console.log(_this.result);
            if (_this.result == "OK") {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__homepage_homepage__["a" /* Homepage */]);
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__homepage_homepage__["a" /* Homepage */]);
                _this.storage.clear();
                var currentOrder = {
                    "id": 'null',
                    "status": "NO_ORDER",
                    "restaurantId": 'null',
                    "itemsCosts": {},
                    "itemsQuantities": {},
                    "itemsPrices": {},
                    "itemsNames": {},
                    "items": [],
                };
                _this.storage.set('currentOrder', currentOrder);
                _this.storage.set('userId', _this.credentialsForm.value.userId);
            }
            else {
                _this.showAlert();
            }
        });
    };
    LoginPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Authentication Error',
            subTitle: 'Incorrect Username or Password. Please try again.',
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.signup = function () {
        // alert("hey")
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignupPage */]);
        // this.nav.setRoot(SignupPage);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <!-- <ion-navbar> -->\n\n    <!-- <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button> -->\n\n    <!-- <ion-title>COEATS</ion-title> -->\n\n  <!-- </ion-navbar> -->\n\n</ion-header>\n\n\n\n<ion-content class="no-scroll">\n\n  <div class="div-logo">\n\n    <ion-row class="logo-row">\n\n      <div class="center">\n\n        <img style="height: 100%;" src="../../assets/imgs/logo.png"/>\n\n      </div>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <!-- <ion-list> -->\n\n  <div class="login-box" center>\n\n    <form [formGroup]="credentialsForm" (ngSubmit)="verifyLogin()">\n\n      <ion-item>\n\n        <!-- <ion-label fixed>Username</ion-label> -->\n\n        <ion-input formControlName="userId" type="text" value="" placeholder="Username"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <!-- <ion-label fixed>Password</ion-label> -->\n\n        <ion-input formControlName="password" type="password" placeholder="Password"></ion-input>\n\n      </ion-item>\n\n      <ion-row class="row-submit" center>\n\n        <div padding class="div-submit-button center">\n\n          <button ion-button full type="submit" color="coeats-red">Log in</button>\n\n        </div>\n\n      </ion-row>\n\n    </form>\n\n    <ion-row center>\n\n      <p class="center account-text">\n\n         Don\'t have an account?\n\n      </p>\n\n    </ion-row>\n\n    <ion-row center>\n\n      <div padding class="div-signup-button center">\n\n        <button ion-button (click)="signup()" color="light">Sign Up</button>\n\n      </div>\n\n    </ion-row>\n\n  </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\login\login.html"*/
            // providers: [AuthService]
            // providers: [forwardRef(() =>LoginPage)]
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderSummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__homepage_homepage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_constraints_order_constraints__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderSummaryPage = (function () {
    function OrderSummaryPage(navCtrl, navParams, storage, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.authService = authService;
        this.storage.get("currentOrder").then(function (currentOrder) {
            console.log(currentOrder);
            _this.orderId = currentOrder.id;
            _this.restaurantId = currentOrder.restaurantId;
            _this.itemsPrices = currentOrder.itemsPrices;
            _this.itemsQuantities = currentOrder.itemsQuantities;
            _this.itemsCosts = currentOrder.itemsCosts;
            _this.itemsNames = currentOrder.itemsNames;
            _this.items = Object.keys(_this.itemsPrices);
            console.log("this order");
            console.log(_this.itemsQuantities);
            _this.total = 0;
            Object.keys(_this.itemsCosts).forEach(function (key) {
                var value = _this.itemsCosts[key];
                console.log("key is " + key + " and value is " + value);
                _this.total += value;
            });
            var currentGeo = { distance: 10, lat: 33.77439, lon: -84.39569 };
            var restDetailsJson = { rest_api_key: _this.restaurantId, lat: currentGeo.lat, lon: currentGeo.lon };
            _this.authService.getRestaurantDetails(restDetailsJson).subscribe(function (restDetails) {
                _this.restaurantName = Object.assign(restDetails["name"]);
            });
        });
    }
    OrderSummaryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderConfirmationPage');
    };
    OrderSummaryPage.prototype.redirectHomepage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__homepage_homepage__["a" /* Homepage */]);
    };
    OrderSummaryPage.prototype.emptyCart = function () {
        var updatedOrder = {
            "id": 'null',
            "status": "NO_ORDER",
            "restaurantId": 'null',
            "itemsCosts": {},
            "itemsQuantities": {},
            "itemsPrices": {},
            "itemsNames": {},
            "items": []
        };
        this.storage.set("currentOrder", updatedOrder);
    };
    OrderSummaryPage.prototype.placeIndOrder = function () {
        // this.navCtrl.push(OrderConstraintsPage, {orderType: "Individual"});
    };
    OrderSummaryPage.prototype.placeCoeats = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__order_constraints_order_constraints__["a" /* OrderConstraintsPage */]);
    };
    OrderSummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order-summary',template:/*ion-inline-start:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\order-summary\order-summary.html"*/'<!--\n\n  Generated template for the OrderConfirmationPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="coeats-red">\n\n    <button ion-button clear (click)="redirectHomepage()">\n\n      <ion-title>COEATS</ion-title>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content *ngIf="restaurantId==\'null\'" padding>\n\n  <div class="item-info" align="center">\n\n    <h2>Order Summary</h2>\n\n    <h3>Your cart is empty!</h3>\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-content *ngIf="restaurantId!=\'null\'"padding>\n\n  <div class="item-info" align="center">\n\n    <h2>Order Summary</h2>\n\n  </div>\n\n  <div class=\'restaurant-name\'>\n\n    <h4><u>{{restaurantName}}</u></h4>\n\n  </div>\n\n\n\n\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items">\n\n      <p *ngIf="itemsQuantities[item]!=0" item-start>\n\n        {{itemsQuantities[item]}} x {{itemsNames[item]}}\n\n      </p>\n\n      <ion-note class=\'note-right\' *ngIf="itemsQuantities[item]!=0" item-end>\n\n        <p color=black>\n\n          $ {{itemsCosts[item]}}\n\n        </p>\n\n      </ion-note>\n\n    </button>\n\n    <ion-item>\n\n      <p item-start>\n\n        <b>Total</b>\n\n      </p>\n\n      <p item-end>\n\n        <b>${{total}}</b>\n\n      </p>\n\n    </ion-item>\n\n    <!-- <button ion-item *ngFor="let item of openOrders" (click)="itemTapped($event, item)"> -->\n\n    <!-- <button ion-item *ngFor="let item of openOrders" (click)="itemTapped($event, item)"> -->\n\n\n\n  </ion-list>\n\n\n\n  <div align="center">\n\n    <button ion-button id="ind-order-button" (click)="placeIndOrder()" side="left">Individual order</button>\n\n    <button ion-button id="coeats-button" (click)="placeCoeats()" side="right">COEATS!</button>\n\n  </div>\n\n  <div align="center">\n\n    <button ion-button color="light" id="empty-cart-button" (click)="emptyCart()">Empty Cart</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\jiayi\OneDrive\Documentos\Gatech-MSCS\Spring18\CS8803-MAS\FinalProject\COEATS\coeats-ionic\src\pages\order-summary\order-summary.html"*/,
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], OrderSummaryPage);
    return OrderSummaryPage;
}());

//# sourceMappingURL=order-summary.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map