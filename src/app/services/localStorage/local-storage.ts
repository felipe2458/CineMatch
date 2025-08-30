import { Injectable } from '@angular/core';
import { getFavorites } from '../../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  addFavorite(add: boolean, filmName: string): void{
    const favorites: getFavorites[] = this.getFavorites();

    if(!favorites.find(fav => fav.filmName === filmName)){
      favorites.push({
        filmName,
        favorite: add
      });

      localStorage.setItem('favorites', JSON.stringify(favorites));

      return
    }

    const index = favorites.findIndex(fav => fav.filmName === filmName);

    favorites[index].filmName = filmName;
    favorites[index].favorite = add;

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getFavorites(): getFavorites[] {
    const favorites = localStorage.getItem('favorites');

    return favorites ? JSON.parse(favorites) : [];
  }
}
