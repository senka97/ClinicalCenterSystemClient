import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddedDialogComponent } from './room-added-dialog.component';

describe('RoomAddedDialogComponent', () => {
  let component: RoomAddedDialogComponent;
  let fixture: ComponentFixture<RoomAddedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAddedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAddedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
