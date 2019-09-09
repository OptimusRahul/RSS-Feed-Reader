import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedProvidersComponent } from './feed-providers.component';

describe('FeedProvidersComponent', () => {
  let component: FeedProvidersComponent;
  let fixture: ComponentFixture<FeedProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
