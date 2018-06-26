import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule  } from '@ionic/storage';

import { MyApp } from './app.component';

import { Homepage } from '../pages/homepage/homepage';
import { RestaurantMenuPage } from '../pages/restaurant-menu/restaurant-menu';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CuisinesListPage } from '../pages/cuisines-list/cuisines-list';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { OrderSummaryPage } from '../pages/order-summary/order-summary';
import { OrderConstraintsPage } from '../pages/order-constraints/order-constraints';
import { OrderTrackingPage } from '../pages/order-tracking/order-tracking';
import { SearchResultsPage } from '../pages/search-results/search-results';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    Homepage,
    RestaurantMenuPage,
    ListPage,
    LoginPage,
    SignupPage,
    CuisinesListPage,
    ItemDetailsPage,
    OrderSummaryPage,
    OrderConstraintsPage,
    OrderTrackingPage,
    SearchResultsPage
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    HttpClientModule,
    // HttpClient,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Homepage,
    RestaurantMenuPage,
    ListPage,
    LoginPage,
    SignupPage,
    CuisinesListPage,
    ItemDetailsPage,
    OrderSummaryPage,
    OrderConstraintsPage,
    OrderTrackingPage,
    SearchResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Geolocation
  ]
})
export class AppModule {}
