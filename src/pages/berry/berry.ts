import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as cheerio from 'cheerio';
import * as find from 'cheerio-eq';
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

  private berryDetails = [];
  private berry;
  private heading;
  private showAll;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.berry = { name: "", img: "", color: "", desc: "", firmness: "", size: "", taste: "", gameEffect: "", growTime: "", natGiftType: "",   natGiftPower: ""};
    this.showAll = navParams.get('showAll');
    if (this.showAll) {
      this.heading = 'All Berries';
      this.loading("");
    }else{
      this.heading =  navParams.get('berry').charAt(0).toUpperCase() +  navParams.get('berry').slice(1);;
      this.loading(navParams.get('berry'));
      // this.getBerryDetails(navParams.get('berry'));
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
        this.berryDetails =  berries;
        console.log(this.berryDetails);
      }
     
    })
  }

  getBerryDetails(berry: string){
    berry = berry.toLowerCase();
    const prefix = "https://www.serebii.net/itemdex/";
    request(prefix + berry + "berry.shtml", (error, response, html) => {
      
      if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        const name = find($, ".dextable:eq(0) tr:eq(0) td:eq(1)").text();
        const img = 'https://www.serebii.net' + find($, ".dextable:eq(1) img").attr("src");
        const color = find($, ".dextable:eq(4) tr:eq(1) td:eq(2)").text();
        const desc = find($, ".dextable:eq(5) tr:eq(2) td:eq(1)").text();
        const firmness = find($, ".dextable:eq(5) tr:eq(5) td:eq(0)").text();
        const size = find($, ".dextable:eq(5) tr:eq(5) td:eq(1)").text();
        const taste = find($, ".dextable:eq(5) tr:eq(5) td:eq(2)").text();
        const gameEffect = find($, ".dextable:eq(5) tr:eq(3) td:eq(0)").text();
        const growTime = find($, ".dextable:eq(4) tr:eq(4) td:eq(0)").text();
        let natGiftType = find($, ".dextable:eq(4) tr:eq(1) td:eq(0) a").attr("href");
        natGiftType = natGiftType.substring(12, natGiftType.indexOf("."));
        const natGiftPower = find($, ".dextable:eq(4) tr:eq(1) td:eq(1)").text();

        const details = {
          name: name,
          img: img,
          color: color,
          desc: desc,
          firmness: firmness,
          size: size,
          taste: taste,
          gameEffect: gameEffect,
          growTime: growTime,
          natGiftType: natGiftType,
          natGiftPower: natGiftPower,
        }

        this.berry = details;
        
        console.log(this.berry);

      }else{
        console.log(error);
      }
    })
  }

  loading(berry: string){
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Talking to the Professor...",
      duration: 5000
    });
    loader.present();
    if(this.showAll){
      this.scrapeForAll();
    }else{
      this.getBerryDetails(berry);
    }
  }

}
