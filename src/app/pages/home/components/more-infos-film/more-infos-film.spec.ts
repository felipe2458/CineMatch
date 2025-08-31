import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfosFilm } from './more-infos-film';

describe('MoreInfosFilm', () => {
  let component: MoreInfosFilm;
  let fixture: ComponentFixture<MoreInfosFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreInfosFilm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreInfosFilm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
