import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerInfoDisplayComponent } from './server-info-display.component';

describe('ServerInfoDisplayComponent', () => {
  let component: ServerInfoDisplayComponent;
  let fixture: ComponentFixture<ServerInfoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerInfoDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
