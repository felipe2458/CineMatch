import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfoCard } from './view-info-card';

describe('ViewInfoCard', () => {
  let component: ViewInfoCard;
  let fixture: ComponentFixture<ViewInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInfoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInfoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
