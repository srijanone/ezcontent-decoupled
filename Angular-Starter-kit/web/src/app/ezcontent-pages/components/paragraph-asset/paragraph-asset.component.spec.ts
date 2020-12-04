import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphAssetComponent } from './paragraph-asset.component';

describe('ParagraphAssetComponent', () => {
  let component: ParagraphAssetComponent;
  let fixture: ComponentFixture<ParagraphAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
