import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubscribersComponent } from './show-subscribers.component';

describe('ShowSubscribersComponent', () => {
  let component: ShowSubscribersComponent;
  let fixture: ComponentFixture<ShowSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSubscribersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
