import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  Injectable,
  InjectionToken,
  forwardRef,
  SkipSelf,
  Optional
} from '@angular/core';

export const NgContextArray = new InjectionToken('NgContextArray');

/**
 * As multi provider don't work on a component/directive level and
 * each sub injector just overwrites the whole array, we define a
 * context array factory which accumulates all parent context objects.
 */
export function NgContextArrayFactory(
  context: NgContextService<any>,
  parentContexts: NgContextService<any>[]
) {
  return parentContexts != null ? [context, ...parentContexts] : [context];
}

export const NgContextProvider = {
  provide: NgContextArray,
  useFactory: NgContextArrayFactory,
  deps: [
    forwardRef(() => NgContextService), // tslint:disable-line
    [new SkipSelf(), new Optional(), NgContextArray]
  ]
};

@Injectable()
export class NgContextService<T> {
  private _name?: string | symbol = undefined;

  get name(): string | symbol {
    if (this._name === undefined) {
      throw new Error(
        `Unable to get name from uninitialized NgContextService`
      );
    }

    return this._name;
  }

  set name(v: string | symbol) {
    if (this._name === undefined) {
      this._name = v;
    }
  }

  set value(v: T) {
    this._value$.next(v);
  }

  private readonly _value$ = new ReplaySubject<T>(1);

  value$ = this._value$.pipe(distinctUntilChanged());
}
