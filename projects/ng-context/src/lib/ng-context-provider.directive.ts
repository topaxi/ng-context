import { Directive, Attribute, Input } from '@angular/core';
import { NgContextService } from './ng-context.service';

@Directive({
  selector: '[ngContext][value]',
  providers: [NgContextService]
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
    this.context.name = ngContextName;
  }
}
