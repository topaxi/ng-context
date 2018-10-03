import { NgModule } from '@angular/core';
import { NgContextModule } from 'ng-context';
import { LazyIndexComponent } from './components/lazy-index.component';
import { LazyRoutingModule } from './lazy-routing/lazy-routing.module';

@NgModule({
  imports: [LazyRoutingModule, NgContextModule],
  declarations: [LazyIndexComponent]
})
export class LazyModule {}
