import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
// import { Headers } from '@angular/http'
// import { HttpModule } from '@angular/http';
// import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
// import { NgModule } from '@angular/core'

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// let
let aws = 'ec2-18-188-100-25.us-east-2.compute.amazonaws.com:5000';
let apiUrl = 'http://'+aws+'/API/verifyUser';
// let apiUrl = "http://ec2-13-58-175-90.us-east-2.compute.amazonaws.com:5000/API/verifyUser";
let apiGetJoinListUrl = 'http://'+aws+'/API/get_join_list';

@Injectable()
export class AuthServiceProvider {
  headers: HttpHeaders ;
  // result: string;
  result: any;
  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
    this.headers = new HttpHeaders(
      {"Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept":"application/json",
      "Content-Type":"application/json",
      "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin"
      }
    );
    console.log(this.headers);
  }


  verifyLogin(credentials: any = {}){
    console.log(credentials);
    return this.http.post(apiUrl, JSON.stringify(credentials), {headers: this.headers});
  }

  getJoinList(geolocation: any = {}){
    return this.http.post(apiGetJoinListUrl, JSON.stringify(geolocation), {headers: this.headers});
  }

  getOrderStatus(orderId: any = {}){
    let apiGetOrderStatus = 'http://'+aws+'/API/get_order_status';
    return this.http.post(apiGetOrderStatus, JSON.stringify(orderId), {headers: this.headers});
  }

  getMenus(restId: any = {}){
    let apiUrl = 'http://'+aws+'/API/get_menus';
    return this.http.post(apiUrl, JSON.stringify(restId), {headers: this.headers});
  }

  getRestaurantDetails(restId_location: any = {}){
    let apiUrl = 'http://'+aws+'/API/get_restaurant_detail';
    return this.http.post(apiUrl, JSON.stringify(restId_location), {headers: this.headers});
  }

  getRestaurantsList(query_location: any = {}){

    let apiUrl = 'http://'+aws+'/API/get_restaurants';
    return this.http.post(apiUrl, JSON.stringify(query_location), 
    {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'}});
  }

  initJoin(json_data: any ={}){
    let apiUrl = 'http://'+aws+'/API/init_join';
    return this.http.post(apiUrl, JSON.stringify(json_data), {headers: this.headers});
  }

  joinOrder(json_data: any ={}){
    let apiUrl = 'http://'+aws+'/API/join';
    return this.http.post(apiUrl, JSON.stringify(json_data), {headers: this.headers});
  }

  createUser(json_data: any ={}){
    let apiUrl = 'http://'+aws+'/API/createUser';
    return this.http.post(apiUrl, JSON.stringify(json_data), {headers: this.headers});
  }

  getUserInfo(json_data: any ={}){
    let apiUrl = 'http://'+aws+'/API/get_user_info';
    return this.http.post(apiUrl, JSON.stringify(json_data), {headers: this.headers});
  }
}
