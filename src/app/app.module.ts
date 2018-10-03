import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgContextModule } from 'ng-context';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgContextModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
