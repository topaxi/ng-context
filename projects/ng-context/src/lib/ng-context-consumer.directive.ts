import { Unsubscribable } from 'rxjs';
import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  Inject,
  Injector,
  ViewContainerRef,
  TemplateRef,
  EmbeddedViewRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgContextService, NgContextArray } from './ng-context.service';
import { byName } from './utils';

export interface NgContextConsumerContext<T> {
  $implicit: T;
}

@Directive({
  selector: '[ngContext][ngContextConsume]'
})
export class NgContextConsumerDirective<T> implements OnInit, OnDestroy {
  @Input()
  ngContextConsume: string | symbol | null = null;

  private embeddedViewRef: EmbeddedViewRef<
    NgContextConsumerContext<T>
  > | null = null;
  private valueSubscription: Unsubscribable | null = null;
  private context: NgContextService<T> | null = null;

  constructor(
    @Inject(NgContextArray) private readonly contexts: NgContextService<any>[],
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<NgContextConsumerContext<T>>,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.ngContextConsume == null) {
      throw new Error(`Unable to get context without consume input`);
    }

    const context = this.contexts.find(byName(this.ngContextConsume));

    if (context === undefined) {
      throw new Error(
        `Context "${this.ngContextConsume.toString()}" not found!`
      );
    }

    this.context = context;
    this.valueSubscription = this.context.value$.subscribe(value => {
      this.onValue(value);
    });
  }

  ngOnDestroy(): void {
    if (this.valueSubscription !== null) {
      this.valueSubscription.unsubscribe();
    }
  }

  private onValue(value: T): void {
    if (this.embeddedViewRef === null) {
      this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(
        this.templateRef,
        { $implicit: value }
      );
    } else {
      this.embeddedViewRef.context.$implicit = value;
    }

    this.cd.detectChanges();
  }
}
