import { NavController, AlertController, LoadingController } from 'ionic-angular';
import Pokedex from 'pokedex-promise-v2';
import { PokemonPage } from '../src/pages/pokemon/pokemon';




export function searchForPokemon(name: string) {
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



