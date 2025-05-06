import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableMapComponent } from './draggable-map.component';

describe('DraggableMapComponent', () => {
  let component: DraggableMapComponent;
  let fixture: ComponentFixture<DraggableMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
