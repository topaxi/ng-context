import { of, Subject } from 'rxjs';
import {
  ViewContainerRef,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgContextConsumerDirective } from './ng-context-consumer.directive';
import { NgContextService } from './ng-context.service';

describe('NgContextConsumerDirective', () => {
  let contexts: NgContextService<unknown>[];
  let viewContainerRef: jasmine.SpyObj<ViewContainerRef>;
  let templateRef: TemplateRef<any>;
  let cd: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(() => {
    contexts = [];
    viewContainerRef = jasmine.createSpyObj('ViewContainerRef', [
      'createEmbeddedView'
    ]);
    templateRef = {} as any;
    cd = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
  });

  describe('ngOnInit()', () => {
    it('should throw on missing ngContextConsume input', () => {
      const directive = new NgContextConsumerDirective(
        contexts,
        viewContainerRef,
        templateRef,
        cd
      );
      expect(() => directive.ngOnInit()).toThrowError(
        /Unable to get context without consume input/
      );
    });

    it('should throw if no context by the given name was found', () => {
      contexts = [{ name: 'foo' } as any];
      const directive = new NgContextConsumerDirective(
        contexts,
        viewContainerRef,
        templateRef,
        cd
      );
      directive.ngContextConsume = 'test';
      expect(() => directive.ngOnInit()).toThrowError(
        /Context "test" not found/
      );
    });

    it('should set template context based on ngContext', () => {
      contexts = [{ name: 'test', value$: of('value') } as any];
      const directive = new NgContextConsumerDirective(
        contexts,
        viewContainerRef,
        templateRef,
        cd
      );
      directive.ngContextConsume = 'test';
      directive.ngOnInit();
      expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
        templateRef,
        { $implicit: 'value' }
      );
      expect(cd.detectChanges).toHaveBeenCalled();
    });

    it('should create template only after value arrives', () => {
      const value$ = new Subject();
      contexts = [{ name: 'test', value$ } as any];
      const directive = new NgContextConsumerDirective(
        contexts,
        viewContainerRef,
        templateRef,
        cd
      );
      directive.ngContextConsume = 'test';
      directive.ngOnInit();
      expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
      expect(cd.detectChanges).not.toHaveBeenCalled();
      value$.next('value');
      expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
        templateRef,
        { $implicit: 'value' }
      );
      expect(cd.detectChanges).toHaveBeenCalled();
    });

    it('should update context on new values', () => {
      const value$ = new Subject();
      contexts = [{ name: 'test', value$ } as any];
      let templateContext: any;
      viewContainerRef.createEmbeddedView.and.callFake(
        (_templateRef: any, context: any) => {
          templateContext = context;
          return { context };
        }
      );
      const directive = new NgContextConsumerDirective(
        contexts,
        viewContainerRef,
        templateRef,
        cd
      );
      directive.ngContextConsume = 'test';
      directive.ngOnInit();
      value$.next('value');
      expect(templateContext.$implicit).toBe('value');
      value$.next('new value');
      expect(templateContext.$implicit).toBe('new value');
    });
  });

  describe('ngOnDestroy()', () => {
    it('should not throw on missing subscription', () => {
      const directive = new NgContextConsumerDirective(
        contexts,
        viewContainerRef,
        templateRef,
        cd
      );
      expect(() => directive.ngOnDestroy()).not.toThrow();
    });

    it('should try to unsubscribe from value subscription', () => {
      const value$ = of('value');
      const subscription = jasmine.createSpyObj('Subscription', [
        'unsubscribe'
      ]);
      spyOn(value$, 'subscribe').and.callFake(() => subscription);
      contexts = [{ name: 'test', value$ } as any];
      const directive = new NgContextConsumerDirective(
        contexts,
        viewContainerRef,
        templateRef,
        cd
      );
      directive.ngContextConsume = 'test';
      directive.ngOnInit();
      directive.ngOnDestroy();
      expect(subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
