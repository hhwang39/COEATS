import { Component, forwardRef, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Homepage } from '../homepage/homepage'

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OrderTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-tracking',
  templateUrl: 'order-tracking.html',
})
export class OrderTrackingPage {
  orderId: number;
  status: string;
  action: string;
  peopleJoined: number;
  minPeople: number;
  timeRemaning: number;
  currentAmount: number;
  minAmount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider
  ) {
      this.orderId = this.navParams.data;
      console.log(this.orderId)
      console.log(this.navParams.data)
      if(this.navParams.data={}){
        console.log("EMPTY")
        this.storage.get("trackingOrderId").then((val) => {
          this.orderId = Object.assign(val)
          var oidJson = {"oId": this.orderId}
          this.authService.getOrderStatus(oidJson).subscribe(orderStatus => {
            this.status = orderStatus["status"]
            if(orderStatus["Executed"] == "False"){
              this.action = "Cancelled"
            }
            else{
              this.action = "Executed"
            }
            this.peopleJoined = orderStatus['num_people_joined']
            this.minPeople = orderStatus['min_people']
            this.timeRemaning =  Number(orderStatus['time_remaining'].toFixed(0))
            this.currentAmount = orderStatus['total_amount']
            this.minAmount = orderStatus['min_amount']
          });
        })
      }
      else{
        var oidJson = {"oId": this.orderId}
        this.authService.getOrderStatus(oidJson).subscribe(orderStatus => {
          this.status = orderStatus["status"]
          if(orderStatus["Executed"] == "False"){
            this.action = "Cancelled"
          }
          else{
            this.action = "Executed"
          }
          this.peopleJoined = orderStatus['num_people_joined']
          this.minPeople = orderStatus['min_people']
          this.timeRemaning =  Number(orderStatus['time_remaining'].toFixed(0))
          this.currentAmount = orderStatus['total_amount']
          this.minAmount = orderStatus['min_amount']

          this.storage.set('trackingOrderId', this.orderId)
        })
      }
    }

    redirectHomepage(){
      this.navCtrl.setRoot(Homepage);
    }

    refresh(){
      this.navCtrl.push(OrderTrackingPage)
    }

}
