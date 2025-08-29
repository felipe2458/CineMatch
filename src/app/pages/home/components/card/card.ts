import { Component, Input } from '@angular/core';
import { Films } from '../../../../interface/interfaces';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatIcon],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() film!: Films;

  favorite: boolean = false;
}
