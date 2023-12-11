import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { WidgetComponent } from './widget.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
  let toastrServiceMock = jasmine.createSpyObj('ToastrService', [
    'success',
    'error',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxDatatableModule, ReactiveFormsModule],
      declarations: [WidgetComponent],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        // Add other dependencies if needed
      ],
    });
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
