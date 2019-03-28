import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldCloudComponent } from './world-cloud.component';

describe('WorldCloudComponent', () => {
  let component: WorldCloudComponent;
  let fixture: ComponentFixture<WorldCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
