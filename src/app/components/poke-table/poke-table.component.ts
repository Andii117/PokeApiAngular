import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: string[] = ['Position', 'Image', 'Name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private pokeService: PokemonApiService, private router:Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons() { 
    let pokemonData;

    for (let index = 1; index <= 150; index++) {
      this.pokeService.getPokemon(index).subscribe(
        res => {
          pokemonData = {
            Position: index,
            Image: res.sprites.front_default,
            Name: res.name
          }
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Obtener informacion de la columna seleccionada
  getRow(row:any) {
    console.log(row);
    let infoPokemon = row;

    this.router.navigateByUrl(`pokeDetail/${infoPokemon.Position}`);
  }
}
