import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingUserComponent } from './choosing-user.component';

describe('ChoosingUserComponent', () => {
  let component: ChoosingUserComponent;
  let fixture: ComponentFixture<ChoosingUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosingUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoosingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
