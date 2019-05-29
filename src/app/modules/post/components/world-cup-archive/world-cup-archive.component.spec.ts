import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldCupArchiveComponent } from './world-cup-archive.component';

describe('WorldCupArchiveComponent', () => {
  let component: WorldCupArchiveComponent;
  let fixture: ComponentFixture<WorldCupArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldCupArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldCupArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
