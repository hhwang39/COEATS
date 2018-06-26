import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Homepage } from '../pages/homepage/homepage';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login'
import { CuisinesListPage } from '../pages/cuisines-list/cuisines-list'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = Homepage;
  pages: Array<{title: string, icon: string, component: any}>;
  localStorage: Storage;
  userId: string

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public menuCuisines: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [];

    this.pages.push({
      title: 'Home ',
      icon: 'home',
      component: Homepage
    });

    this.pages.push({
      title: 'Cuisines',
      icon: 'restaurant',
      component: CuisinesListPage
    })

    this.pages.push({
      title: 'My Orders',
      icon: 'list-box',
      component: ListPage
    })

    this.pages.push({
      title: 'Settings',
      icon: 'settings',
      component: ListPage
    })

    this.pages.push({
      title: 'Logout',
      icon: 'exit' ,
      component: LoginPage
    })

    // this.pages = [
    //   { title: 'Home', component: Homepage},
    //   { title: 'American', component: ListPage },
    //   { title: 'Chinese', component: ListPage },
    //   { title: 'Japanese', component: ListPage },
    //   { title: 'Logout', component: LoginPage}
    //
    // ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //back button handle
      //Registration of push in Android and Windows Phone
      var lastTimeBackPress = 0;
      var timePeriodToExit  = 2000;

      let currentOrder = {
        "id": 'null',
        "status": "NO_ORDER", //NO_ORDER, IP, DONE
        "restaurantId": 'null',
        "itemsCosts": {}, //new Map<string, number>()
        "itemsQuantities": {},
        "itemsPrices": {},
        "itemsNames": {},
        "items": [],
      }

      this.storage.set('currentOrder', currentOrder);

      this.platform.registerBackButtonAction(() => {
        // get current active page
        let view = this.nav.getActive();
        if (view.component.name == "TabsPage") {
        //Double check to exit app
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            this.platform.exitApp(); //Exit from app
          } else {
            let toast = this.toastCtrl.create({
              message:  'Press back again to exit App?',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            lastTimeBackPress = new Date().getTime();
          }
        } else {
          // go to previous page
          this.nav.pop();
          // this.nav.backHistory();
          // navigator.app.backHistory();
        }
      });
    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.menuCuisines.close();
    // navigate to the new page if it is not the current page

    if(page.title=='Cuisines'){
      this.nav.push(page.component);
    } else{
      this.nav.setRoot(page.component);
    }

  }

  redirectPage(page) {
    this.menu.close();
    this.nav.push(page.component);
    // this.navCtrl.push(ItemDetailsPage, {
    //   item: item
    // });
  }
}
