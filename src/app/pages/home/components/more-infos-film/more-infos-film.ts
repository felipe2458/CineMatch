import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Films } from '../../../../interface/interfaces';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-infos-film',
  imports: [MatIcon, CommonModule],
  templateUrl: './more-infos-film.html',
  styleUrl: './more-infos-film.scss'
})
export class MoreInfosFilm implements OnChanges{
  @Input() film!: Films;

  @Output() changeMoreInfosFilm = new EventEmitter<void>();

  minorPC: boolean = false;
  productionCompany: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["film"] && this.film){
      this.minorPC = this.film.productionCompany.split('/').length > 1;

      if(this.minorPC){
        this.productionCompany = `
        ${this.film.productionCompany.split('/')[0]}/<br/>${this.film.productionCompany.split('/')[1]}
        `;
      }
    }
  }
}
