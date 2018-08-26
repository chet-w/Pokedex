import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the GamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {

  private allGames;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    http.get("../../assets/json/berries.json").subscribe((res) => {
      this.allGames = res.json();
      console.log(this.allGames);
    });

  }

  

}
