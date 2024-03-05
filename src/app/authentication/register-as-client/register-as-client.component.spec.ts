import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsClientComponent } from './register-as-client.component';

describe('RegisterAsClientComponent', () => {
  let component: RegisterAsClientComponent;
  let fixture: ComponentFixture<RegisterAsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAsClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
