import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(private renderer: Renderer2){}

  @ViewChild('searchLabel') searchLabel!: ElementRef<HTMLLabelElement>;

  search: string = '';
  category: string = 'all';

  searchMovies(){
    if(this.search.trim() === ''){
      this.renderer.setStyle(this.searchLabel.nativeElement, 'opacity', 1);
      return;
    }

    this.renderer.setStyle(this.searchLabel.nativeElement, 'opacity', 0);
  }

  changeCategory(event: Event){
    const input = event.target as HTMLInputElement;

    //console.log(input.value);
  }
}
