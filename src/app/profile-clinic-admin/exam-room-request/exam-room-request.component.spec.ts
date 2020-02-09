import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExamRoomRequestComponent } from './exam-room-request.component';
import { MedicalExamRequest } from 'src/app/shared/model/MedicalExamRequest';
import { RouterTestingModule } from '@angular/router/testing';
describe('ExamRoomRequestComponent', () => {
  let component: ExamRoomRequestComponent;
  let fixture: ComponentFixture<ExamRoomRequestComponent>;
  let _examRequests: MedicalExamRequest[];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
       
     
       
      ],
      imports: [

        
      ],
      declarations: [ ExamRoomRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRoomRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ExamRoomRequestComponent', () => {
    it ('ExamRooms:', () => {


   
     
    });


  });
});
