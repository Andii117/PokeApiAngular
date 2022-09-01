import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';

  constructor(private services: PokemonApiService, private activatedRouter: ActivatedRoute) { 
    //Obtener el id del parametro que se le pasa por url
    this.activatedRouter.params.subscribe(
      params =>{
        this.getPokemon(params['id']);
      }
    );
  }

  ngOnInit(): void {}

  getPokemon(id: number) {
    


    this.services.getPokemon(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
      },
      err => {
        console.log(err)
      }
    );
  }

  
  
}
