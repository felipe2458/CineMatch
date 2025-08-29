import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films } from '../../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetData {
  constructor(private http: HttpClient){}

  getFilms(): Observable<Films[]>{
    return this.http.get<Films[]>('json/films.json');
  }
}
