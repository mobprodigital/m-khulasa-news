import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLoaderComponent } from './single-loader.component';

describe('SingleLoaderComponent', () => {
  let component: SingleLoaderComponent;
  let fixture: ComponentFixture<SingleLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
