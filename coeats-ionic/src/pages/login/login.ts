import { Component, forwardRef, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController} from 'ionic-angular';
// import { Http, Headers, HttpModule } from '@angular/http'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

import { Homepage } from '../homepage/homepage';
import { SignupPage } from '../signup/signup';

// import { Observable } from 'rxjs/rx';
// import { Subscription } from 'rxjs/Rx';
// import { ListPage } from '../list/list';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  // providers: [AuthService]
  // providers: [forwardRef(() =>LoginPage)]
})
export class LoginPage {
  credentialsForm: FormGroup;
  // result: Observable <any>;
  // fake_credentials = { userId:'test_user', password:'test_password'}
  fake_credentials = { userId:'ppp', password:'ppp'};
  credentials = { userId: '', password:''}
  // data: Observable <any>;
  result: string;
  // loginData = { username:'', password:'' };
  // credentialsForm = { username:'', password:''}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider,
      public storage: Storage) {

    this.credentialsForm = this.formBuilder.group({
      userId: [''],
      password: [''],
    });
  }

  verifyLogin() {
    this.authService.verifyLogin(this.credentialsForm.value).subscribe(data => {
      this.result = data['result'];
      console.log(this.result);
      if(this.result=="OK"){
        this.navCtrl.push(Homepage);
        this.nav.setRoot(Homepage);
        this.storage.clear()
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

        this.storage.set('userId', this.credentialsForm.value.userId);
      }
      else{
        this.showAlert();
      }
      });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Authentication Error',
      subTitle: 'Incorrect Username or Password. Please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

  signup() {
    // alert("hey")
    this.navCtrl.push(SignupPage);
    // this.nav.setRoot(SignupPage);
  }
}
