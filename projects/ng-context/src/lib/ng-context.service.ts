import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { NgContextGlobalService } from './ng-context-global.service';

@Injectable()
export class NgContextService<T> implements OnDestroy {
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
    if (v !== undefined && this._name === undefined) {
      this._name = v;
      this.contexts.register(this);
    }
  }

  set value(v: T) {
    this._value$.next(v);
  }

  private readonly _value$ = new ReplaySubject<T>(1);

  value$ = this._value$.pipe(distinctUntilChanged());

  constructor(private readonly contexts: NgContextGlobalService) {}

  ngOnDestroy(): void {
    this.contexts.unregister(this);
  }
}
