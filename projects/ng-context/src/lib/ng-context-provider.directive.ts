import { Directive, Attribute, Input } from '@angular/core';
import { NgContextProvider, NgContextService } from './ng-context.service';

@Directive({
  selector: '[ngContext][value]',
  providers: [NgContextService, NgContextProvider]
})
export class NgContextProviderDirective<T> {
  @Input()
  set value(v: T) {
    this.context.value = v;
  }

  constructor(
    private readonly context: NgContextService<T>,
    @Attribute('ngContext') ngContextName: string
  ) {
    context.name = ngContextName;
  }
}
