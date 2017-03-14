import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreHTTPRequestsComponent } from './more-httprequests.component';

describe('MoreHTTPRequestsComponent', () => {
  let component: MoreHTTPRequestsComponent;
  let fixture: ComponentFixture<MoreHTTPRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreHTTPRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreHTTPRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
