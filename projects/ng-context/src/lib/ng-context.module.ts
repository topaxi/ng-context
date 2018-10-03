import { NgModule } from '@angular/core';
import { NgContextProviderDirective } from './ng-context-provider.directive';
import { NgContextConsumerDirective } from './ng-context-consumer.directive';

@NgModule({
  imports: [],
  declarations: [NgContextProviderDirective, NgContextConsumerDirective],
  exports: [NgContextProviderDirective, NgContextConsumerDirective]
})
export class NgContextModule {}
