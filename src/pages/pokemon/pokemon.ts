import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
import Pokedex from 'pokedex-promise-v2';
import * as request from 'request';
import * as cheerio from 'cheerio';



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
  private evolutionImgs = [];
  private pokedex;
  


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

  scrape(id: string){
    request('https://www.serebii.net/pokedex-bw/' + id + '.shtml', (error, response, html) => {
      if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        let imgs = [];
        const prefix = 'https://www.serebii.net';

        $('.evochain img').each((i, el) => {
          if(el.attribs.src.charAt(0) != '/'){
            imgs.push(prefix + '/pokedex-bw/' + el.attribs.src);
          }else{
            imgs.push(prefix + el.attribs.src);
          }
          console.log(el.attribs.src);
        });
        this.evolutionImgs = imgs;
        console.log(this.evolutionImgs);

      }
    })
  }


  extractDetails(details) {
    this.pokemonDetails = {
      id: this.formatID(details.id),
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
    this.scrape(this.pokemonDetails.id);
    console.log(this.pokemonDetails);
  }

  formatID(id: number){
    if(id < 10){
      return '00'+ id;
    }if(id >= 10 && id < 100 ){
      return '0'+ id;
    }else{
      return id;
    }
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

  toggleFav(){
    // this.isFav = !this.isFav;
    // if(this.isFav){
    //   this.app.favourites.push(this.pokemonDetails);
    //   console.log(this.app.favourites);
    // }
  }

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
