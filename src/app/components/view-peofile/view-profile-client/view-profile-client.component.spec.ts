import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileClientComponent } from './view-profile-client.component';

describe('ViewProfileClientComponent', () => {
  let component: ViewProfileClientComponent;
  let fixture: ComponentFixture<ViewProfileClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProfileClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProfileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
