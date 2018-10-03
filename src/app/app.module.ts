import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgContextModule } from 'ng-context';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgContextModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
