import { Component, forwardRef, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Homepage } from '../homepage/homepage'
import { OrderTrackingPage } from '../order-tracking/order-tracking'

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OrderConstraintsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-constraints',
  templateUrl: 'order-constraints.html',
})
export class OrderConstraintsPage {
  orderId: string;
  minPeople: number;
  maxTime: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider
  ) {

    this.storage.get("currentOrder").then((val) => {
      console.log(val)
      this.orderId = Object.assign(val.id)

      if(this.orderId!='null'){
        var oidJson = {"oId": this.orderId}

        this.authService.getOrderStatus(oidJson).subscribe(orderStatus => {
          this.minPeople = Number(orderStatus['num_people_joined'].toFixed(0))
          this.maxTime = Number(orderStatus['time_remaining'].toFixed(0))
        });
      }
      else{
        // set default values
        this.minPeople = 2
        this.maxTime = 15
      }

    });

  }

  plusOnePeople(){
    this.minPeople = this.minPeople+1;
  }

  minusOnePeople(){
    if(this.minPeople>1){
      this.minPeople = this.minPeople-1;
    }
  }

  plusOneTime(){
    this.maxTime = this.maxTime+1;
  }

  minusOneTime(){
    if(this.maxTime>1){
      this.maxTime = this.maxTime-1;
    }
  }

  initOrder(minPeople, maxTime){
    console.log(minPeople, maxTime)

    var userId = ""
    this.storage.get("userId").then((data) => {

      userId = Object.assign(data)
    })

    this.storage.get("currentOrder").then((currentOrder) => {
      var restJson = {rest_api_key: currentOrder["restaurantId"], lat: 33.77439, lon: -84.39569}

      this.authService.getRestaurantDetails(restJson).subscribe(restaurant => {
        var itemsList = []

        Object.keys(currentOrder.itemsCosts).forEach(key => {
          let item = {item_api_key: key, item_price: currentOrder.itemsCosts[key]}
          itemsList.push(Object.assign({}, item))
        })

        var json = {duration: maxTime, rest_api_key: currentOrder.restaurantId,
                    rest_name: restaurant["name"], lat: restJson.lat, lon: restJson.lon,
                    username: userId, min_people: minPeople, min_amount: restaurant["min_delivery_price"],
                    item_list: itemsList
                   }
        console.log(json)

        this.authService.initJoin(json).subscribe(data =>{
          console.log("INIT JOIN")
          console.log(data)

          currentOrder.id = Object.assign(data["oId"])
          currentOrder.status = "DONE"
          this.storage.set('currentOrder', currentOrder)
          this.storage.set('trackingOrderId', data["oId"])
          console.log(currentOrder)

          this.navCtrl.push(OrderTrackingPage, data["oId"] );
        })

      })
    })



  }

  joinOrder(orderId){
    var userId = ""
    this.storage.get("userId").then((data) => {

      userId = Object.assign(data)
    })

    this.storage.get("currentOrder").then((currentOrder) => {
      var itemsList = []

      Object.keys(currentOrder.itemsCosts).forEach(key => {
        let item = {item_api_key: key, item_price: currentOrder.itemsCosts[key]}
        itemsList.push(Object.assign({}, item))
      })

      var json = {oId: currentOrder.id, username: userId, item_list: itemsList}

      this.authService.joinOrder(json).subscribe(data =>{
        console.log("JOIN ORDER")
        console.log(data)
      })

    })

    this.storage.set('trackingOrderId', orderId)
    this.navCtrl.push(OrderTrackingPage, orderId);

  }

  redirectHomepage(){
    this.navCtrl.setRoot(Homepage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConstraintsPage');
  }

}
