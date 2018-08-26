import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as cheerio from 'cheerio';
import * as find from 'cheerio-eq';
import * as request from 'request';

/**
 * Generated class for the PokeballsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokeballs',
  templateUrl: 'pokeballs.html',
})
export class PokeballsPage {

  private allPokeballs;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    console.log("calling loading");
    this.loading();
    this.getPokeballs();
  }

  loading() {
    console.log("loading..")
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Checking at the Pokemart...",
      duration: 3000
    });
    loader.present();
  }

  getPokeballs() {
    request('https://www.serebii.net/itemdex/list/pokeball.shtml', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let pokeballs = [];
        const prefix = "https://www.serebii.net";
        $('.dextable tbody tr[height="32"]').each((i, el) => {
          const img = prefix + $(el).find('.cen img').attr('src');
          const name = $(el).find('.fooinfo a').text();
          const desc = $(el).find('.fooinfo').eq(1).text();

          pokeballs.push({ name, desc, img });
        })
        this.allPokeballs = pokeballs;
        console.log(this.allPokeballs);
      }

    })
  }


}
