import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePostComponent } from './archive-post.component';

describe('ArchivePostComponent', () => {
  let component: ArchivePostComponent;
  let fixture: ComponentFixture<ArchivePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
