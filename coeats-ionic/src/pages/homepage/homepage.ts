import { Component, forwardRef, Inject } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ListPage } from '../list/list';
import { RestaurantMenuPage } from '../restaurant-menu/restaurant-menu';
import { LoginPage } from '../login/login';
import { SearchResultsPage } from '../search-results/search-results';

import { Geolocation, GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'

})
export class Homepage {
  openOrders: Array<{
    id: string,
    restId: string,
    restName: string,
    restImg: string,
    time: number,
    njoined: number,
    minPeople: number,
    foodTypes: string[],
    lat: number,
    lon: number,
    distance: number,
    distMeasure: string
  }>;

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
  // items: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation : Geolocation,
    public storage: Storage,
    public alertCtrl: AlertController,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider
  ) {

    this.openOrders = [];
    this.restaurants = [];
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

    // TODO: use real geolocation
    this.currentGeo =  { distance: 10, lat: 33.77439, lon: -84.39569}
    console.log(this.currentGeo)
    this.authService.getJoinList(this.currentGeo).subscribe(data => {
      // this.result = data['result'];
      this.openOrders = [];
      console.log(data)
      console.log(data['result']);
      if(data['result']=="OK"){
        console.log(data['orderList'])
        var currentOrder = {
          "id": 'null',
          "restId": 'null', //NO_ORDER, IP, DONE
          "restName": 'null',
          "restImg": '../../assets/imgs/restaurant.jpg',
          "lat": 0, //new Map<string, number>()
          "lon": 0,
          "foodTypes": [],
          "distance": 0,
          "distMeasure": 'null',
          "time": 0,
          "njoined": 0,
          "minPeople": 0
        }

        for(let order of data['orderList']){
          var oidJson = {"oId": order.oId}
          this.authService.getOrderStatus(oidJson).subscribe(orderStatus => {
            var restJson = {rest_api_key: order.rest_api_key, lat: 33.77439, lon: -84.39569}

            this.authService.getRestaurantDetails(restJson).subscribe(restDetails =>{
            // gettng all info from get_join_list
              currentOrder.id = order.oId
              currentOrder.restId = order.rest_api_key
              currentOrder.restName = order.rest_name
              currentOrder.restImg = restDetails["logo"]
              currentOrder.lat = order.lat
              currentOrder.lon = order.lon
              currentOrder.foodTypes = order.foodTypes
              currentOrder.distance = order.distance * 0.621371 // to miles
              currentOrder.distMeasure = "miles"
              if(currentOrder.distance < 0.1){
                currentOrder.distance *= 5280
                currentOrder.distMeasure = "feet"
              }
              currentOrder.distance = Number(currentOrder.distance.toFixed(2));

              // gettng all info from get_order_status
              currentOrder.njoined = Number(orderStatus['num_people_joined'].toFixed(0))
              currentOrder.time = Number(orderStatus['time_remaining'].toFixed(0))
              currentOrder.minPeople = orderStatus['min_people']

              var deepCopy = Object.assign({}, currentOrder);
              this.openOrders.push(deepCopy)
              console.log(this.openOrders)
            })
          });
        }
    }
      else{
        this.showAlert();
      }
    });

    var query_geo = { query: ' ', lat: 33.77439, lon: -84.39569}
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

    console.log(this.restaurants)

  }

  onSearch(ev) {
    console.log(ev.target.value)
    let query = ev.target.value
    this.navCtrl.push(SearchResultsPage, query);
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

  ionViewDidEnter(){


  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Loading Error',
      subTitle: 'Oops, there has been an error retrieving orders. Please refresh.',
      buttons: ['OK']
    });
    alert.present();
  }

  redirectHomepage(){
    this.navCtrl.setRoot(Homepage);
  }
}
