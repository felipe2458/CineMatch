import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetData } from '../../services/get-data/get-data';
import { Films, MoreInfosFilmInter } from '../../interface/interfaces';
import { Card } from './components/card/card';
import { LocalStorage } from '../../services/localStorage/local-storage';
import { MoreInfosFilm } from './components/more-infos-film/more-infos-film';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Card, MoreInfosFilm, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  allFilmsLength: number = 0;
  favoriteFilmsLength: number = 0;
  popularFilmsLength: number = 0;
  onTheRiseFilmsLength: number = 0;

  moreInfosFilmSelected!: Films;

  allFilms: Films[] = [];

  constructor(private renderer: Renderer2, private getDataService: GetData, private localStorage: LocalStorage){
    this.getDataService.getFilms().subscribe(films => {
      films.forEach(film => {
        film.cast.splice(4);

        this.films.push(film);
        this.allFilms.push(film);
      })

      this.allFilmsLength = films.length;

      this._filterPopularAndOnTheRiseFilms(films);

      this._changeFavorite();
    });
  }

  @ViewChild('searchLabel') searchLabel!: ElementRef<HTMLLabelElement>;

  search: string = '';
  category: string = 'all';
  films: Films[] = [];

  viewContributors: boolean = false;

  moreInfosFilmVal: MoreInfosFilmInter = {
    display: false,
    opacity: false
  }

  changeMoreInfosFilm(e: { film: Films} | null){
    document.body.style.overflowY = this.moreInfosFilmVal.display ? "auto" : "hidden";

    if(!this.moreInfosFilmVal.display){
      this.moreInfosFilmSelected = e ? e.film : this.moreInfosFilmSelected;

      this.moreInfosFilmVal.display = true;
      setTimeout(() => this.moreInfosFilmVal.opacity = !this.moreInfosFilmVal.opacity), 200;
    }else{
      setTimeout(() => this.moreInfosFilmVal.display = false, 510);
      this.moreInfosFilmVal.opacity = false;
    }
  }

  _filterPopularAndOnTheRiseFilms(films: Films[]){
    films.forEach(film => {
      if(film.category.toLowerCase() === "popular"){
        this.popularFilmsLength++;
      }

      if(film.category.toLowerCase() === "em alta"){
        this.onTheRiseFilmsLength++;
      }
    });
  }

  _changeFavorite(){
    let favLeng = 0;

    this.localStorage.getFavorites().forEach((films) => {
      if(films.favorite){
        favLeng++;
      }
    })

    this.favoriteFilmsLength = favLeng;
  }

  showContributors(){
    this.viewContributors = !this.viewContributors;

    document.body.style.overflowY = this.viewContributors ? 'hidden' : 'auto';
  }

  searchMovies(){
    if(this.search.trim() === ''){
      this.films = this.allFilms;
      this.renderer.setStyle(this.searchLabel.nativeElement, 'opacity', 1);
      return;
    }

    this.renderer.setStyle(this.searchLabel.nativeElement, 'opacity', 0);

    this.films = this.allFilms.filter(f => f.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  changeCategory(event: Event){
    const input = event.target as HTMLInputElement;

    this.getDataService.getFilms().subscribe(films => {
      this.search = '';
      this.searchMovies();

      this.films = [];
      this.allFilms = [];

      switch(input.value){
        case "all":
          films.forEach(film => {
            film.cast.splice(4);

            this.films.push(film);
            this.allFilms.push(film);
          });
          break;
        case "favorites":
          const favorites = this.localStorage.getFavorites();
          let favoritesFilms: string[] = [];

          for(const fav of favorites){
            for(const film of films){
              if(film.title === fav.filmName && fav.favorite){
                if(!favoritesFilms.includes(film.title)){
                  favoritesFilms.push(film.title);
                }
              }
            }
          }

          films.forEach(flm => {
            if(favoritesFilms.includes(flm.title)){
              flm.cast.splice(4);

              this.films.push(flm);
              this.allFilms.push(flm);
            }
          });
          break;
        case "popular":
          let popularFilms: string[] = [];

          for(const film of films){
            if(film.category.toLowerCase() === "popular"){
              if(!popularFilms.includes(film.title)){
                popularFilms.push(film.title);
              }
            }
          }

          films.forEach(flm => {
            if(popularFilms.includes(flm.title)){
              flm.cast.splice(4);

              this.films.push(flm);
              this.allFilms.push(flm);
            }
          });
          break;
        case "onTheRise":
          let onTheRiseFilms: string[] = [];

          for(const film of films){
            if(film.category.toLowerCase() === "em alta"){
              if(!onTheRiseFilms.includes(film.title)){
                onTheRiseFilms.push(film.title);
              }
            }
          }

          films.forEach(flm => {
            if(onTheRiseFilms.includes(flm.title)){
              flm.cast.splice(4);

              this.films.push(flm);
              this.allFilms.push(flm);
            }
          });
          break;
      }
    });
  }
}
