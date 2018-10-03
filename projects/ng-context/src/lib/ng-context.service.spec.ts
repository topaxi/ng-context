import { TestBed } from '@angular/core/testing';

import { NgContextService } from './ng-context.service';

describe('NgContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgContextService = TestBed.get(NgContextService);
    expect(service).toBeTruthy();
  });
});
