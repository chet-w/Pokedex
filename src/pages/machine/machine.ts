import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as cheerio from 'cheerio';
import * as find from 'cheerio-eq';
import * as request from 'request';

/**
 * Generated class for the MachinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-machine',
  templateUrl: 'machine.html',
})
export class MachinePage {

  private machineDetails = [];
  private machine;
  private heading;
  private showAll;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.showAll = navParams.get('showAll');
    if (this.showAll) {
      this.heading = 'All Machines';
      this.loading("");
    }else{
      this.heading = "Heading";
      this.loading(navParams.get('machine'));
    }

  }

  scrapeForAll(){
    request('https://www.serebii.net/black2white2/tmhm.shtml', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let machines = [];

        $('.tab tr').each((i, el) => {
         if(i > 0){
          const number = $(el).find('td').eq(0).text();
          const name = $(el).find('td').eq(1).text();
          let type = $(el).find('td img').eq(0).attr("src");
          type = type.substring(17, type.indexOf("."));
          let kind = $(el).find('td img').eq(1).attr("src");
          kind = kind.substring(17, kind.indexOf("."));
          const att = $(el).find('td').eq(4).text();
          const acc = $(el).find('td').eq(5).text();
          const pp = $(el).find('td').eq(6).text();
          const effect = $(el).find('td').eq(7).text();

          const machine = {
            number: number,
            name: name,
            type: type,
            kind: kind,
            att: att,
            acc: acc,
            pp: pp,
            effect: effect
          }
          this.machineDetails.push(machine);
         }
        }) 
      }
    })
  }

  getMachineDetails(machine: string){
    
  }

  loading(machine: string){
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Talking to the Professor...",
      duration: 5000
    });
    loader.present();
    if(this.showAll){
      this.scrapeForAll();
    }else{
      this.getMachineDetails(machine);
    }
  }



}
