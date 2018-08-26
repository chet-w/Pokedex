import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PokeballsPage } from './pokeballs';

@NgModule({
  declarations: [
    PokeballsPage,
  ],
  imports: [
    IonicPageModule.forChild(PokeballsPage),
  ],
})
export class PokeballsPageModule {}
