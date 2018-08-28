import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  private machine = {};
  private heading;
  private showAll;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl: LoadingController) {
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
          const effect = $(el).find('td').eq(7).text();

          const machine = {
            number: number,
            name: name,
            effect: effect
          }
          this.machineDetails.push(machine);
         }
        }) 
      }
    })
  }

  machineNotFound(){
    this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Machine not Found',
      subTitle: "Doesn't look like we could find a machine with that name. Try a different one!",
      buttons: [{
        text: 'OK',
        role: 'ok',
        handler: () => {
          this.navCtrl.pop(); 
        }
      },]
    });
    alert.present();
  }

  getMachineDetails(machine: string){
    machine = machine.toLowerCase();
    machine = machine.replace(/ /g,'');
  
    const prefix = "https://www.serebii.net/attackdex-bw/";
    
    request(prefix + machine + ".shtml", (error, response, html) => {
      if(response.statusCode == 404){
        this.machineNotFound();
      }
      if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        const name = find($, ".dextab:eq(0) b").text();
        let type = find($, ".dextable:eq(0) tr:eq(1) td:eq(1) a").attr("href");
        type = type.substring(14, type.indexOf("."));
        let kind = find($, ".dextable:eq(0) tr:eq(1) td:eq(2) a").attr("href");
        kind = kind.substring(14, kind.indexOf("."));
        const pp = find($, ".dextable:eq(0) tr:eq(3) td:eq(0)").text();
        const basePower = find($, ".dextable:eq(0) tr:eq(3) td:eq(1)").text();
        const acc = find($, ".dextable:eq(0) tr:eq(3) td:eq(2)").text();
        const battleEffect = find($, ".dextable:eq(0) tr:eq(5) td:eq(0)").text();
        const secondaryEffect = find($, ".dextable:eq(0) tr:eq(7) td:eq(0)").text();
        const secondaryEffectRate = find($, ".dextable:eq(0) tr:eq(7) td:eq(1)").text();
        const number = find($, ".dextable:eq(0) tr:eq(9) td:eq(0)").text();
        const speed = find($, ".dextable:eq(0) tr:eq(9) td:eq(1)").text();
        
        const machine = {
          name: name,
          number: number,
          type: type,
          kind: kind,
          pp: pp,
          basePower: basePower,
          accuracy: acc,
          battleEffect: battleEffect,
          secondaryEffect: secondaryEffect,
          secondaryEffectRate: secondaryEffectRate,
          speed: speed
        }
        this.machine = machine;
        console.log(this.machine);
      }
    });
  }

  loading(machine: string){
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Talking to the Professor...",
      dismissOnPageChange: true
    });
    loader.present();
    if(this.showAll){
      this.scrapeForAll();
    }else{
      this.getMachineDetails(machine);
    }
  }



}
