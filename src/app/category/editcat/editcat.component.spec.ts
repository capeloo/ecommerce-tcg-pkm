import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcatComponent } from './editcat.component';

describe('EditcatComponent', () => {
  let component: EditcatComponent;
  let fixture: ComponentFixture<EditcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
