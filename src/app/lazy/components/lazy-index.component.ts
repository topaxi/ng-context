import { Component } from '@angular/core';

@Component({
  template: `<div *ngContext="let foo consume 'foo'">Routed consume {{foo}}</div>`
})
export class LazyIndexComponent {}
