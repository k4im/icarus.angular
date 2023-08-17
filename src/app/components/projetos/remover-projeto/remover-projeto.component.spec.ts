import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverProjetoComponent } from './remover-projeto.component';

describe('RemoverProjetoComponent', () => {
  let component: RemoverProjetoComponent;
  let fixture: ComponentFixture<RemoverProjetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoverProjetoComponent]
    });
    fixture = TestBed.createComponent(RemoverProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
