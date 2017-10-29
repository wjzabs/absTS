import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GLTACCT1Component } from './gltacct1.component';

describe('GLTACCT1Component', () => {
  let component: GLTACCT1Component;
  let fixture: ComponentFixture<GLTACCT1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GLTACCT1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GLTACCT1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
