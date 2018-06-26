import { Component, forwardRef, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { RestaurantMenuPage } from '../restaurant-menu/restaurant-menu';
import { LoginPage } from '../login/login';
import { Homepage } from '../homepage/homepage';

import { Geolocation, GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {
  query: string;

  restaurants: Array<{
    rest_api_key: string
    name: string,
    logo: string,
    min_wait_time: number,
    max_wait_time: number,
    delivery_price: number,
    open: boolean,
    foodTypes: string[]
  }>;

  options : GeolocationOptions;
  // currentPos : Geoposition;
  currentGeo: {distance: number, lat: number, lon: number}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation : Geolocation,
    public storage: Storage,
    public alertCtrl: AlertController,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider
  ) {

    this.query = this.navParams.data;

    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        console.log(pos);
        console.log(pos.coords);
        this.currentGeo = { distance: 10, lat: pos.coords.latitude, lon: pos.coords.longitude}
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });

    var query_geo = { query: this.query, lat: 33.77439, lon: -84.39569}
    console.log(query_geo)
    this.authService.getRestaurantsList(query_geo).subscribe(restaurantsList => {
      this.restaurants = [];
      console.log(restaurantsList)
      console.log(restaurantsList["restaurants"])

      var deepCopy = Object.assign([], restaurantsList["restaurants"])

      console.log(deepCopy)
      this.restaurants = deepCopy
      console.log(this.restaurants)
    });


  }

  itemTapped(event, order) {
    console.log("homepage");
    // console.log(restaurant.restName);
    this.navCtrl.push(RestaurantMenuPage, order.restId);
    this.storage.set("orderIdTemp", order.id)
    console.log("ORDERIDTEMP", order.id)
  }

  restTapped(event, restaurant) {
    console.log("homepage");
    // console.log(restaurant.restName);
    this.navCtrl.push(RestaurantMenuPage, restaurant.rest_api_key);
    this.storage.set("orderIdTemp", 'null')
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  redirectHomepage(){
    this.navCtrl.setRoot(Homepage);
  }

}
