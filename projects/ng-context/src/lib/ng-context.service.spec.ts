import { TestBed } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles/jasmine';

import { NgContextService, NgContextArrayFactory } from './ng-context.service';

describe('NgContextService', () => {
  let service: NgContextService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgContextService]
    });

    service = TestBed.get(NgContextService);
  });

  it('should throw on unintialized name', () => {
    expect(() => service.name).toThrowError(
      /Unable to get name from uninitialized NgContextService/
    );
  });

  it('should set name', () => {
    service.name = 'Test';
    expect(service.name).toBe('Test');
  });

  it('should set name only once', () => {
    service.name = 'Test';
    service.name = 'Test2';
    expect(service.name).toBe('Test');
  });

  it(
    'should emit last emitted value',
    marbles(m => {
      m.expect(service.value$).toBeObservable('b');
      service.value = 'a';
      service.value = 'a';
      service.value = 'b';
      m.flush();
      m.expect(service.value$).toBeObservable('b');
    })
  );
});

describe('NgContextArrayFactory', () => {
  it('should accumulate context objects', () => {
    expect(NgContextArrayFactory({} as any, null as any)).toEqual([{} as any]);
    expect(NgContextArrayFactory({} as any, undefined as any)).toEqual([
      {} as any
    ]);
    expect(NgContextArrayFactory({} as any, [])).toEqual([{} as any]);
    expect(NgContextArrayFactory({} as any, [{ name: 'two' } as any])).toEqual(
      [{} as any, { name: 'two' } as any]
    );
  });
});
