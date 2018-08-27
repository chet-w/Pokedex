import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MachinePage } from '../machine/machine';

/**
 * Generated class for the MachinesSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-machines-search',
  templateUrl: 'machines-search.html',
})
export class MachinesSearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  browseMachines(){
    this.loading("");
    this.openMachinePage(null, true);
  }

  searchForMachine(machine: string){
    if(machine=== ""){
      this.showAlert();
    }
    console.log("loading");
    this.loading(machine);
    this.openMachinePage(machine, false)
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: "It isn't the right time to use that!",
      subTitle: "Doesn't look like we could find a machine with that name. Try a different one!",
      buttons: ['OK']
    });
    alert.present();
  }

  openMachinePage(machine: string, showAll: boolean){
    if(showAll){
      this.navCtrl.push(MachinePage, { showAll: true });
    }else{
      this.navCtrl.push(MachinePage, { showAll: false, machine: machine})
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
