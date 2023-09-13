import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoprodutoComponent } from './novoproduto.component';

describe('NovoprodutoComponent', () => {
  let component: NovoprodutoComponent;
  let fixture: ComponentFixture<NovoprodutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoprodutoComponent]
    });
    fixture = TestBed.createComponent(NovoprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
