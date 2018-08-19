import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerrySearchPage } from './berry-search';

@NgModule({
  declarations: [
    BerrySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BerrySearchPage),
  ],
})
export class BerrySearchPageModule {}
