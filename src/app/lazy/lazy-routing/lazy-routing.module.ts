import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyIndexComponent } from '../components/lazy-index.component';

const routes: Routes = [
  {
    path: '',
    component: LazyIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: []
})
export class LazyRoutingModule {}
