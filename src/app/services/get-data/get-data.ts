import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films } from '../../interface/interfaces';
import { LocalStorage } from '../localStorage/local-storage';

@Injectable({
  providedIn: 'root'
})
export class GetData {
  constructor(private http: HttpClient, private localStorage: LocalStorage){}

  getFilms(): Observable<Films[]>{
    const films = this.http.get<Films[]>('json/films.json');

    films.subscribe(filmsSUB => {
      const favorites = this.localStorage.getFavorites();

      filmsSUB.forEach(film => {
        const fav = favorites.find(fav => fav.filmName === film.title);

        if(!fav){
          this.localStorage.addFavorite(false, film.title);
        }
      });
    });

    return films;
  }
}
