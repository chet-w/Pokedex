import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import Pokedex from 'pokedex-promise-v2';

import { PokemonPage } from '../pokemon/pokemon'
import { isUndefined } from 'ionic-angular/util/util';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private pokedex;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    const options = {
      protocol: 'https',
      hostName: 'pokeapi.co',
      versionPath: '/api/v2/',
      cacheLimit: 100 * 1000
    }

    this.pokedex = new Pokedex(options);



  }

  searchForPokemon(name: string) {
    this.loading(name);
    this.pokedex.getPokemonByName(name.toLowerCase())
      .then((response) => {

        const refinedDetails = this.getDetails(response, name)
        this.openPokemonPage(refinedDetails);
      })
      .catch((error) => {
        this.pokemonNotFound(name);
      });
  }

  getDetails(details, name) {

    let newDetails = {
      id: details.id,
      name: details.name,
      type: details.types,
      abilities: [],
      height: details.height,
      weight: details.weight,
      heldItems: [],
      moves: [],
      stats: details.stats,
      baseXp: details.base_experience,
      images: [details.sprites.front_default, details.sprites.front_shiny]
    };

    newDetails.abilities = this.getAbilityDetails(details);
    newDetails.moves = this.getMovesDetails(details);
    newDetails.heldItems = this.getHeldItemsDetails(details);

    return newDetails;
  }



  

  getAbilityDetails(details){
    let abList = [];
    details.abilities.forEach((ability) => {
      this.pokedex.getAbilityByName(ability.ability.name).then((abilityResp) => {
        let actual = { name: "", desc: "", isHidden: false, slot: 0 };
        actual.name = ability.ability.name;
        actual.desc = abilityResp.flavor_text_entries[2].flavor_text;
        actual.isHidden = ability.isHidden;
        actual.slot = ability.slot;
        abList.push(actual);
      });
    });
    return abList;
  }

  getMovesDetails(details){
    let movesList = [];
    details.moves.forEach((moveObject) => {

      let moveDesc = "";
      let moveType = "";
      if (moveObject.version_group_details[0].move_learn_method.name == "level-up") {
        this.pokedex.getMoveByName(moveObject.move.name).then((moveResp) => {
          moveDesc = moveResp.flavor_text_entries[2].flavor_text;
          moveType = moveResp.type.name;
          const newMove = {
            name: moveObject.move.name,
            type: moveType,
            desc: moveDesc,
            level: moveObject.version_group_details[0].level_learned_at
          };
          movesList.push(newMove);  
        });
      }
    });
    return movesList;
  }

  getHeldItemsDetails(details){
    let itemsList = [];
    details.held_items.forEach((item) => {
      this.pokedex.getItemByName(item.item.name).then((itemResp) => {
        itemsList.push({
          name: itemResp.name,
          sprite: itemResp.sprites.default
        });
      })
    });
    return itemsList;
  }

  openPokemonPage(details) {
    this.navCtrl.push(PokemonPage, {
      pokemon: details
    });
  }


  loading(name: string) {
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Talking to the Professor...",
      dismissOnPageChange: true,
      duration: 9000

    });
    loader.present();
  }

  pokemonNotFound(name) {
    const alert = this.alertCtrl.create({
      title: 'Not even a Nibble...',
      subTitle: "It doesn't look like we could find anything on the Pokemon '" + name + "'. Maybe you spelt it wrong, give it another go!",
      buttons: ['OK']
    });
    alert.present();
  }

}
