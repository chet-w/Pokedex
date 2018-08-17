import { Component, Renderer, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
import Pokedex from 'pokedex-promise-v2';

/**
 * Generated class for the SecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'pokemon-page',
  templateUrl: 'pokemon.html',
})
export class PokemonPage {

  private pokemonDetails;
  private pokedex;
  private movesOpen = false;
  @ViewChild("moves") cardContent:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer) {
    const details = navParams.get('pokemon');


    const options = {
      protocol: 'https',
      hostName: 'pokeapi.co',
      versionPath: '/api/v2/',
      cacheLimit: 100 * 1000, // 100s
    }

    this.pokedex = new Pokedex(options);
    this.extractDetails(details);
  }

  


  extractDetails(details) {
    this.pokemonDetails = {
      id: details.id,
      name: this.formatString(details.name),
      type: this.formatType(details.type),
      abilities: this.formatAbilities(details.abilities),
      height: details.height,
      weight: details.weight,
      moves: details.moves,
      stats: details.stats,
      baseXp: details.baseXp,
      heldItems: details.heldItems,
      images: details.images
    };

    console.log(this.pokemonDetails);
  }

  formatString(string: string): string {
    return string.charAt(0).toUpperCase() + string.substr(1);
  }

  formatAbilities(abilities){
    
    // strings.forEach((str) => {
    //   const splitStr = str.split('-');
      
    //   for (let i = 0; i < splitStr.length; i++) {
    //     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    //   }
    //   const joined = splitStr.join(" ");
    //   newStrings.push(joined);
    // });

    

    return abilities;
  }

  formatType(typeArray): Array<string> {
    let types = [];
    const type1 = typeArray.find((el) => {
      return el.slot == 1;
    });
    types.push(type1.type.name);
    const type2 = typeArray.find((el) => {
      return el.slot == 2;
    });
    if (type2) {
      types.push(type2.type.name);
    }

    return types;
  }

  // toggleMoves() {
  //   if(this.movesOpen){
  //     this.renderer.setElementClass(this.cardContent.nativeElement, "moves-closed", true);
  //   }else{
  //     this.renderer.setElementClass(this.cardContent.nativeElement, "moves-closed", false);
  //   }
  //   this.movesOpen = !this.movesOpen;
  //   console.log(this.movesOpen);
  // }

  handlePan(event){
    if(event.direction == 4){
      console.log("right")
      
    }if(event.direction == 2){
      console.log("left")
    }
  }



  

  ionViewDidLoad() {
    
  }

}
