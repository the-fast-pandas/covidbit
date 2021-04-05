// Server - CovidBit - Fast Pandas
// Created: 04, March, 2021, Teresa Costa

import { TestBed } from '@angular/core/testing';
import { AdmService } from './adm.service';

describe('AdmService', () => {
  let service: AdmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
