import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import Pokedex from 'pokedex-promise-v2';
import { BerryPage } from '../berry/berry';

/**
 * Generated class for the BerrySearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berry-search',
  templateUrl: 'berry-search.html',
})
export class BerrySearchPage {

  private pokedex;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    
  }

  browseBerries(berry: string){
    this.loading(berry);
    this.openBerryPage(null, true);
  }

  searchForBerry(berry: string){
    this.loading(berry);
    this.openBerryPage(berry, false)
  }

  openBerryPage(berry: string, showAll: boolean){
    if(berry=== ""){
      //show error
      return;
    }
    if(showAll){
      this.navCtrl.push(BerryPage, { showAll: true });
    }else{
      this.navCtrl.push(BerryPage, { showAll: false, berry: berry})
    }
  }

  loading(name: string){
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Talking to the Professor...",
      duration: 3000
    });
    loader.present();
  }

}
