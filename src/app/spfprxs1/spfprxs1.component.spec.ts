import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPFPRXS1Component } from './spfprxs1.component';

describe('SPFPRXS1Component', () => {
  let component: SPFPRXS1Component;
  let fixture: ComponentFixture<SPFPRXS1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPFPRXS1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPFPRXS1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
