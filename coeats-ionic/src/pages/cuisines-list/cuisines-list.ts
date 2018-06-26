import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Homepage } from '../homepage/homepage';


/**
 * Generated class for the CuisinesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuisines-list',
  templateUrl: 'cuisines-list.html',
  // templateUrl: '../../app/app.html',
})
export class CuisinesListPage {
  cuisines: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cuisines = ['American', 'Chinese', 'Ethiopian', 'Korean', 'Indian',
    'Italian', 'Mediterranean', 'Vietnamese']

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuisinesListPage');
  }

  openPage(item) {
    this.navCtrl.setRoot(Homepage, {
      item: item
    });
  }

}
