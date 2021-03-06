import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BerrySearchPage } from '../pages/berry-search/berry-search';
import { GamesPage } from '../pages/games/games';
import { PokeballsPage } from '../pages/pokeballs/pokeballs';
import { MachinesSearchPage } from '../pages/machines-search/machines-search';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  favourites: Array<Object>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Pokemon', component: HomePage },
      { title: 'Pokeballs', component: PokeballsPage },
      { title: 'Machines', component: MachinesSearchPage},
      { title: 'Berries', component: BerrySearchPage },
      { title: 'Games', component: GamesPage }

      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
