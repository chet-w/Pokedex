import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MachinesSearchPage } from './machines-search';

@NgModule({
  declarations: [
    MachinesSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MachinesSearchPage),
  ],
})
export class MachinesSearchPageModule {}
