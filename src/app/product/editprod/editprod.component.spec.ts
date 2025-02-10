import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprodComponent } from './editprod.component';

describe('EditprodComponent', () => {
  let component: EditprodComponent;
  let fixture: ComponentFixture<EditprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditprodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
