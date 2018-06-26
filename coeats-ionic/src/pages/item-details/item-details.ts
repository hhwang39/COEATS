import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestaurantMenuPage } from '../restaurant-menu/restaurant-menu';
import { OrderSummaryPage } from '../order-summary/order-summary';
import { Homepage } from '../homepage/homepage'

import { Storage } from '@ionic/storage';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  restaurantId: string;
  item: {
    menu_api_key: string,
    name: string,
    description: string,
    img: string,
    price: string
  }
  quantity: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.item = this.navParams.get("item");
    this.restaurantId = this.navParams.get("restaurantId");
    this.quantity = 0;
    console.log(this.item.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
    console.log(this.quantity);
  }


  addToCart(item, quantity){
    let updatedOrder = {
      "id": 'null',
      "status": "NO_ORDER", //NO_ORDER, IP, DONE
      "restaurantId": 'null',
      "itemsCosts": {}, //new Map<string, number>()
      "itemsQuantities": {},
      "itemsPrices": {},
      "itemsNames": {},
    }

    console.log("add to cart clicked");
    // if(this.quantity > 0){
      this.storage.get("currentOrder").then((val) => {
        updatedOrder = val;
        console.log('currentOrder', val);
        this.storage.get('orderIdTemp').then((orderIdTemp) =>{
          if(val.status!="IP" || this.restaurantId!=val.restaurantId || orderIdTemp!=val.id){
            console.log("UPDATING ORDER DETAILS")
            // updatedOrder.id = Object.assign(orderIdTemp)
            console.log("OrderIdTemp", orderIdTemp)
            updatedOrder.id = Object.assign(orderIdTemp)

            updatedOrder.status="IP",
            updatedOrder.restaurantId=this.restaurantId,
            updatedOrder.itemsCosts = {}
            updatedOrder.itemsQuantities = {}
            updatedOrder.itemsPrices = {}
            updatedOrder.itemsNames = {}
          }

          updatedOrder.itemsCosts[item.menu_api_key] = this.quantity * item.price
          updatedOrder.itemsQuantities[item.menu_api_key] = this.quantity
          updatedOrder.itemsPrices[item.menu_api_key] = item.price
          updatedOrder.itemsNames[item.menu_api_key] = item.name

          this.storage.set("currentOrder", updatedOrder)

          console.log('currentOrder', updatedOrder);
          });



        })
        // else{
        //   updatedOrder.itemsCosts=val.itemsCosts
        // }


      this.navCtrl.push(RestaurantMenuPage, this.restaurantId);
    // }
    // else{
    //   this.showAlert();
    // }



  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Quantity Error',
      subTitle: 'Please specify quantity.',
      buttons: ['OK']
    });
    alert.present();
  }


  redirectToCart(){
    console.log("WIP - redirect to cart");
    this.navCtrl.push(OrderSummaryPage);
  }

  redirectHomepage(){
    this.navCtrl.setRoot(Homepage);
  }

  plusOne(){
    this.quantity = this.quantity+1;
  }

  minusOne(){
    if(this.quantity>0){
      this.quantity = this.quantity-1;
    }
  }

}

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
