import { Component, forwardRef, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Homepage } from '../homepage/homepage';
import { OrderConstraintsPage } from '../order-constraints/order-constraints';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-summary',
  templateUrl: 'order-summary.html',
})
export class OrderSummaryPage {
  orderId: string;
  restaurantId: string;
  restaurantName: string;
  itemsPrices: Map<string, number>;
  itemsQuantities: Map<string, number>;
  itemsCosts: Map<string, number>;
  itemsNames: Map<string, string>;
  items: Array<any>;
  total: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider
  ) {
    this.storage.get("currentOrder").then((currentOrder) => {
      console.log(currentOrder)
      this.orderId = currentOrder.id
      this.restaurantId = currentOrder.restaurantId
      this.itemsPrices = currentOrder.itemsPrices
      this.itemsQuantities = currentOrder.itemsQuantities
      this.itemsCosts = currentOrder.itemsCosts
      this.itemsNames = currentOrder.itemsNames
      this.items = Object.keys(this.itemsPrices)
      console.log("this order")
      console.log(this.itemsQuantities)

      this.total = 0;
      Object.keys(this.itemsCosts).forEach(key => {
        let value = this.itemsCosts[key];
        console.log(`key is ${key} and value is ${value}`);
        this.total += value
      });

      let currentGeo =  { distance: 10, lat: 33.77439, lon: -84.39569}
      let restDetailsJson = {rest_api_key: this.restaurantId, lat: currentGeo.lat, lon: currentGeo.lon}
      this.authService.getRestaurantDetails(restDetailsJson).subscribe(restDetails =>{
        this.restaurantName = Object.assign(restDetails["name"]);
      })
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationPage');

  }

  redirectHomepage(){
    this.navCtrl.setRoot(Homepage);
  }

  emptyCart(){
    let updatedOrder = {
      "id": 'null',
      "status": "NO_ORDER", //NO_ORDER, IP, DONE
      "restaurantId": 'null',
      "itemsCosts": {}, //new Map<string, number>()
      "itemsQuantities": {},
      "itemsPrices": {},
      "itemsNames": {},
      "items": []
    }
    this.storage.set("currentOrder", updatedOrder)
  }

  placeIndOrder(){
    // this.navCtrl.push(OrderConstraintsPage, {orderType: "Individual"});
  }

  placeCoeats(){
    this.navCtrl.push(OrderConstraintsPage);
  }


}
