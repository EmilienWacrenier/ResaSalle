import { TestBed } from '@angular/core/testing';

import { SearchDataServiceService } from './search-data-service.service';

describe('SearchDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchDataServiceService = TestBed.get(SearchDataServiceService);
    expect(service).toBeTruthy();
  });
});
