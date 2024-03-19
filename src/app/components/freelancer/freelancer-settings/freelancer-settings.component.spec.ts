import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerSettingsComponent } from './freelancer-settings.component';

describe('FreelancerSettingsComponent', () => {
  let component: FreelancerSettingsComponent;
  let fixture: ComponentFixture<FreelancerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
