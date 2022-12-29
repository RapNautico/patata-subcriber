import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSubscribersComponent } from './save-subscribers.component';

describe('SaveSubscribersComponent', () => {
  let component: SaveSubscribersComponent;
  let fixture: ComponentFixture<SaveSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSubscribersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
