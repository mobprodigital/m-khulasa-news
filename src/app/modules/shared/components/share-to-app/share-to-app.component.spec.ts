import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareToAppComponent } from './share-to-app.component';

describe('ShareToAppComponent', () => {
  let component: ShareToAppComponent;
  let fixture: ComponentFixture<ShareToAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareToAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareToAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
