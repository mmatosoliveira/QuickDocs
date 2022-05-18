import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemDocComponent } from './card-item-doc.component';

describe('CardItemDocComponent', () => {
  let component: CardItemDocComponent;
  let fixture: ComponentFixture<CardItemDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
