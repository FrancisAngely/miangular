import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTemplateRefComponent } from './ng-template-ref.component';

describe('NgTemplateRefComponent', () => {
  let component: NgTemplateRefComponent;
  let fixture: ComponentFixture<NgTemplateRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgTemplateRefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgTemplateRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
