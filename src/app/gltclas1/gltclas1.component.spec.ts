import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gltclas1Component } from './gltclas1.component';

describe('Gltclas1Component', () => {
  let component: Gltclas1Component;
  let fixture: ComponentFixture<Gltclas1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gltclas1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gltclas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
