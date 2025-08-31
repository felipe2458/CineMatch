import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Films, FilmsWithFavorite } from '../../../../interface/interfaces';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { LocalStorage } from '../../../../services/localStorage/local-storage';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatIcon],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements OnInit{
  @Input() film!: Films;

  @Output() changeFavoriteInp = new EventEmitter<void>();
  @Output() changeMoreInfosFilm = new EventEmitter<{film: Films}>();

  filmWithFavorite!: FilmsWithFavorite;

  constructor(private localStorage: LocalStorage) {}

  ngOnInit(): void {
    if(this.localStorage.getFavorites().length === 0){
      this._createFilmWithFavorite(false);
      return;
    }

    this.localStorage.getFavorites().forEach(film => {
      if(this.film.title === film.filmName){
        this._createFilmWithFavorite(film.favorite);
        return;
      }
    });
  }

  _createFilmWithFavorite(fav: boolean){
    this.filmWithFavorite = {
      ...this.film,
      favorite: fav
    }
  }

  changeFavorite(): void{
    this.filmWithFavorite.favorite = !this.filmWithFavorite.favorite;
    this.localStorage.addFavorite(this.filmWithFavorite.favorite, this.film.title);

    setTimeout(() => this.changeFavoriteInp.emit());
  }

  changeMoreInfosFilmEmit(){
    this.changeMoreInfosFilm.emit({film: this.film});
  }
}
