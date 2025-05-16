import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutingBarComponent } from './outing-bar.component';

describe('OutingBarComponent', () => {
  let component: OutingBarComponent;
  let fixture: ComponentFixture<OutingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
