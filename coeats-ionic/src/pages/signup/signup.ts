import { Component, forwardRef, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

import { Homepage } from '../homepage/homepage';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  credentialsForm: FormGroup;
  result: any;
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public storage: Storage,
    @Inject(forwardRef(() => AuthServiceProvider)) public authService: AuthServiceProvider) {

    this.credentialsForm = this.formBuilder.group({
      userId: [''],
      password: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      phone_number: ['']
    });
  }

  createUser() {
    this.authService.createUser(this.credentialsForm.value).subscribe(data => {
      console.log(data)
      this.result = data['result'];
      console.log(this.result);
      if(this.result=="OK"){
        this.navCtrl.push(Homepage);
        this.nav.setRoot(Homepage);
        this.storage.set('userId', this.credentialsForm.value.userId);
      }
      else{
        this.showAlert();
      }
      });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sign Up Error',
      subTitle: 'Check your inputs and please try again.',
      buttons: ['OK']
    });
    alert.present();
  }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignupPage');
  // }

}
