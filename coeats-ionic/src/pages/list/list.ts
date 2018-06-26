import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { RestaurantMenuPage } from '../restaurant-menu/restaurant-menu';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  restaurants: Array<{
    title: string,
    stars: number,
    dollars:number,
    time: number,
    njoined: number,
    img: string
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.restaurants = [];
    for(let i = 6; i < 11; i++) {
      this.restaurants.push({
        title: 'Restaurant ' + i,
        stars: Math.floor(Math.random() * 50)/10,
        dollars: Math.floor(Math.random()*3)+1,
        time: Math.floor(Math.random()*30)+1,
        njoined: Math.floor(Math.random()*5)+1,
        img: '../../assets/imgs/restaurant.jpg'
        // title: 'Restaurant ' + i, stars: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, restaurant) {
    this.navCtrl.push(RestaurantMenuPage, {
      restaurant: restaurant
    });
  }
}
