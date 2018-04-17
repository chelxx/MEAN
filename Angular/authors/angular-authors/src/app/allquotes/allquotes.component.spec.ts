import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllquotesComponent } from './allquotes.component';

describe('AllquotesComponent', () => {
  let component: AllquotesComponent;
  let fixture: ComponentFixture<AllquotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllquotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
