import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuisinesListPage } from './cuisines-list';

@NgModule({
  declarations: [
    // CuisinesListPage,
  ],
  imports: [
    IonicPageModule.forChild(CuisinesListPage),
  ],
})
export class CuisinesListPageModule {}
