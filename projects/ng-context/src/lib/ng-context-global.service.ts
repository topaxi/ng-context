import { Injectable } from '@angular/core';
import { NgContextService } from './ng-context.service';

@Injectable({ providedIn: 'root' })
export class NgContextGlobalService {
  private readonly contexts = new Map<
    NgContextService<any>['name'],
    NgContextService<any>
  >();

  register(context: NgContextService<any>): void {
    if (this.contexts.has(context.name)) {
      throw new Error(
        `Unable to register context "${context.name.toString()}". A context with this name is already registered!`
      );
    }

    this.contexts.set(context.name, context);
  }

  unregister(context: NgContextService<any>): void {
    this.contexts.delete(context.name);
  }

  get(contextName: NgContextService<any>['name']) {
    const context = this.contexts.get(contextName);

    if (context === undefined) {
      throw new Error(`Unknown context "${contextName.toString()}"`);
    }

    return context;
  }
}
