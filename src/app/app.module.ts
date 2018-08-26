import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PokemonPage } from '../pages/pokemon/pokemon';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BerrySearchPage } from '../pages/berry-search/berry-search';
import { BerryPage } from '../pages/berry/berry';
import { GamesPage } from '../pages/games/games';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PokemonPage,
    BerrySearchPage,
    BerryPage,
    GamesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PokemonPage,
    BerrySearchPage,
    BerryPage,
    GamesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
