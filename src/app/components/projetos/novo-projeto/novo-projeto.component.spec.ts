import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoProjetoComponent } from './novo-projeto.component';

describe('NovoProjetoComponent', () => {
  let component: NovoProjetoComponent;
  let fixture: ComponentFixture<NovoProjetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoProjetoComponent]
    });
    fixture = TestBed.createComponent(NovoProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
