import { Component, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetData } from '../../services/get-data/get-data';
import { Films } from '../../interface/interfaces';
import { Card } from './components/card/card';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(private renderer: Renderer2, private getDataService: GetData){
    this.getDataService.getFilms().subscribe(films => {
      this.films = films;
    });
  }

  @ViewChild('searchLabel') searchLabel!: ElementRef<HTMLLabelElement>;

  search: string = '';
  category: string = 'all';
  films: Films[] = [];

  viewContributors: boolean = false;

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
      console.log(films.length);
    });
  }
}
