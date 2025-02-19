import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoDetailComponent } from './contacto-detail.component';

describe('ContactoDetailComponent', () => {
  let component: ContactoDetailComponent;
  let fixture: ComponentFixture<ContactoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
