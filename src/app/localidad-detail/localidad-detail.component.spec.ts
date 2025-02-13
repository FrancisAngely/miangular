import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadDetailComponent } from './localidad-detail.component';

describe('LocalidadDetailComponent', () => {
  let component: LocalidadDetailComponent;
  let fixture: ComponentFixture<LocalidadDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalidadDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalidadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
