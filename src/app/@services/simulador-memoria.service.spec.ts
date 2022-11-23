import { TestBed } from '@angular/core/testing';

import { SimuladorMemoriaService } from './simulador-memoria.service';

describe('SimuladorMemoriaService', () => {
  let service: SimuladorMemoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimuladorMemoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
