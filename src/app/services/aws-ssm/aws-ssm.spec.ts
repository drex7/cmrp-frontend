import { TestBed } from '@angular/core/testing';

import { AwsSsm } from './aws-ssm';

describe('AwsSsm', () => {
  let service: AwsSsm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsSsm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
