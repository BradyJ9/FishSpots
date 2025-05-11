import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoScrollerComponent } from './photo-scroller.component';

describe('PhotoScrollerComponent', () => {
  let component: PhotoScrollerComponent;
  let fixture: ComponentFixture<PhotoScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoScrollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
