import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerryPage } from './berry';

@NgModule({
  declarations: [
    BerryPage,
  ],
  imports: [
    IonicPageModule.forChild(BerryPage),
  ],
})
export class BerryPageModule {}
