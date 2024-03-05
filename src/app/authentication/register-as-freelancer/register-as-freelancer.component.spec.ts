import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsFreelancerComponent } from './register-as-freelancer.component';

describe('RegisterAsFreelancerComponent', () => {
  let component: RegisterAsFreelancerComponent;
  let fixture: ComponentFixture<RegisterAsFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAsFreelancerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAsFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
