import { Unsubscribable } from 'rxjs';
import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  ViewContainerRef,
  TemplateRef,
  EmbeddedViewRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgContextService } from './ng-context.service';
import { NgContextGlobalService } from './ng-context-global.service';

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
    private readonly contexts: NgContextGlobalService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<NgContextConsumerContext<T>>,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.ngContextConsume == null) {
      throw new Error(`Unable to get context without consume input`);
    }

    this.context = this.contexts.get(this.ngContextConsume);
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
