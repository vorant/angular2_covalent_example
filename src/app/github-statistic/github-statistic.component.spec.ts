import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubStatisticComponent } from './github-statistic.component';

describe('GithubStatisticComponent', () => {
  let component: GithubStatisticComponent;
  let fixture: ComponentFixture<GithubStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
