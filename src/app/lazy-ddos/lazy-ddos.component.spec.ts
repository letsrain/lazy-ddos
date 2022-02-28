import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyDdosComponent } from './lazy-ddos.component';

describe('LazyDdosComponent', () => {
  let component: LazyDdosComponent;
  let fixture: ComponentFixture<LazyDdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyDdosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyDdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
