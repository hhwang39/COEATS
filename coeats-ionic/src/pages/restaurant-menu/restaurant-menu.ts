import { Component, forwardRef, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Homepage } from '../homepage/homepage'
import { ItemDetailsPage } from '../item-details/item-details'
import { OrderSummaryPage } from '../order-summary/order-summary';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Storage } from '@ionic/storage';

import { Geolocation, GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

/**
 * Generated class for the RestaurantMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant-menu',
  templateUrl: 'restaurant-menu.html',
})
export class RestaurantMenuPage {
  userId: string;
  restaurant: {
    id: string,
    name: string,
    // stars: number,
    // dollars:number,
    img: string,
    // foodTypes: string[]
    items: Array<{
      menu_api_key: string,
      name: string,
      description: string,
      // img: string,
      price: string
    }>
  };
  options : GeolocationOptions;

  currentGeo: {distance: number, lat: number, lon: number}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation : Geolocation,
    public storage: Storage,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider
  ) {
    this.restaurant = {
      id: '',
      name: '',
      img: '../../assets/imgs/logo.png',
      items: []
    }

    this.currentGeo = {
      distance: 0,
      lat: 0,
      lon: 0
    }

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        console.log(pos);
        console.log(pos.coords);
        var tempGeo = { distance: 10, lat: pos.coords.latitude, lon: pos.coords.longitude}
        console.log(tempGeo)
        this.currentGeo = Object.assign({}, tempGeo);
        console.log(this.currentGeo)
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });

    var restId = this.navParams.data;

    this.currentGeo =  { distance: 10, lat: 33.77439, lon: -84.39569}
    let restDetailsJson = {rest_api_key: restId, lat: this.currentGeo.lat, lon: this.currentGeo.lon}
    console.log(restDetailsJson)


    var restIdJson = {"rest_api_key": restId}

    this.authService.getRestaurantDetails(restDetailsJson).subscribe(restDetails =>{
      var restaurantTemp = {
        "id": 'null',
        "name": 'null', //NO_ORDER, IP, DONE
        "img": '../../assets/imgs/restaurant.jpg',
        "items": []
      }

      restaurantTemp.name = restDetails['name']
      restaurantTemp.img = restDetails['logo']
      console.log(restDetails)
      console.log(restaurantTemp.img)

      this.authService.getMenus(restIdJson).subscribe(data => {

        // TODO: check result
        restaurantTemp.id = restId
        restaurantTemp.items = data["menus"]
        // var deepCopy = Object.assign({}, restaurantTemp);
        var deepCopy = Object.assign({}, restaurantTemp);
        this.restaurant = deepCopy
      })


    })

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantMenuPage');
    this.storage.get('userId').then((data) => {
      this.userId = data;
      console.log("userId", this.userId);
    });
  }

  redirectHomepage(){
    this.navCtrl.setRoot(Homepage);
  }

  itemTapped(item, restaurant){
    console.log(restaurant)
    this.navCtrl.push(ItemDetailsPage,
      {item:item, restaurantId: restaurant.id});
  }

  redirectToCart(){
    this.navCtrl.push(OrderSummaryPage);
  }

}
