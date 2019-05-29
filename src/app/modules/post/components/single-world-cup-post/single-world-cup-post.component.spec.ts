import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWorldCupPostComponent } from './single-world-cup-post.component';

describe('SingleWorldCupPostComponent', () => {
  let component: SingleWorldCupPostComponent;
  let fixture: ComponentFixture<SingleWorldCupPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleWorldCupPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWorldCupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
