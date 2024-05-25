import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileFreelancerComponent } from './view-profile-freelancer.component';

describe('ViewProfileFreelancerComponent', () => {
  let component: ViewProfileFreelancerComponent;
  let fixture: ComponentFixture<ViewProfileFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProfileFreelancerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProfileFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
