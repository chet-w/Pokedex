import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as cheerio from 'cheerio';
import * as request from 'request';
import Pokedex from 'pokedex-promise-v2';


/**
 * Generated class for the BerryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berry',
  templateUrl: 'berry.html',
})
export class BerryPage {

  private berryDetails;
  private heading;
  private showAll;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.showAll = navParams.get('showAll');
    if (this.showAll) {
      this.heading = 'All Berries';
      this.scrapeForAll();
    }else{
      this.heading = navParams.get('berry');
      console.log(navParams);
      this.getBerryDetails(navParams.get('berry'));
      
    }
  }

  scrapeForAll() {
    request('https://www.serebii.net/itemdex/list/berry.shtml', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let berries = [];
        const prefix = "https://www.serebii.net";
        $('.dextable tbody tr[height="32"]').each((i, el) => {
          const img = prefix + $(el).find('.cen img').attr('src'); 
          const name = $(el).find('.fooinfo a').text();
          const desc = $(el).find('.fooinfo').eq(1).text();

          berries.push({name, desc, img});
        }) 
        console.log(berries);
        this.berryDetails =  berries;
      }
     
    })
  }

  getBerryDetails(berry: string){
    berry = berry.toLowerCase();
    const prefix = "https://www.serebii.net/itemdex/";
    request(prefix + berry + "berry.shtml", (error, response, html) => {
      if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        console.log(html);
      }else{
        console.log(error);
      }
    })
  }

}
