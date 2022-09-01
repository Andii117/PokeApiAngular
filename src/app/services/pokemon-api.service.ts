import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {


  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { 

  }

  getPokemon(index:number) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }

  getAllPokemon() {
    return this.http.get<any>(`${this.baseUrl}/pokemon`);
  }
}
