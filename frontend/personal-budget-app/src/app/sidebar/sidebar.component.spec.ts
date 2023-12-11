import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarComponent } from './sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  beforeEach(() => {
    toastrServiceMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);

    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [HttpClientTestingModule, RouterModule],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map().set('yourParam', 'someValue'),
            },
          },
        },
        // Add other dependencies if needed
      ],
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
