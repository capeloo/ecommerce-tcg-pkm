import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokebagPageComponent } from './pokebag-page.component';

describe('PokebagPageComponent', () => {
  let component: PokebagPageComponent;
  let fixture: ComponentFixture<PokebagPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokebagPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokebagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
