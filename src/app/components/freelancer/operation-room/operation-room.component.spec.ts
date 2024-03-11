import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRoomComponent } from './operation-room.component';

describe('OperationRoomComponent', () => {
  let component: OperationRoomComponent;
  let fixture: ComponentFixture<OperationRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
