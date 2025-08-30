import { Component, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetData } from '../../services/get-data/get-data';
import { Films } from '../../interface/interfaces';
import { Card } from './components/card/card';
import { LocalStorage } from '../../services/localStorage/local-storage';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  allFilmsLength: number = 0;
  favoriteFilmsLength: number = 0;
  popularFilmsLength: number = 0;
  onTheRiseFilmsLength: number = 0;

  constructor(private renderer: Renderer2, private getDataService: GetData, private localStorage: LocalStorage){
    this.getDataService.getFilms().subscribe(films => {
      this.films = films;

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

  @HostListener('window:keydown', ['$event'])
  showContributors(event: KeyboardEvent){
    if(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'l'){
      this.viewContributors = !this.viewContributors;
    }
  }

  searchMovies(){
    if(this.search.trim() === ''){
      this.renderer.setStyle(this.searchLabel.nativeElement, 'opacity', 1);
      return;
    }

    this.renderer.setStyle(this.searchLabel.nativeElement, 'opacity', 0);
  }

  changeCategory(event: Event){
    const input = event.target as HTMLInputElement;

    this.getDataService.getFilms().subscribe(films => {
      this.films = [];

      switch(input.value){
        case "all":
          this.films = films;
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
              this.films.push(flm);
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
              this.films.push(flm);
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
              this.films.push(flm);
            }
          });
          break;
      }
    });
  }
}
