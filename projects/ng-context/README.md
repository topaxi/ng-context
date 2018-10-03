# ngContext

A declarative approach to sharing data through your codebase.

Avoid passing inputs and attributes down a deep component tree without
creating extra services for each case.

## Usage

Import ngContext module:

```typescript
import { NgContextModule } from 'ng-context';

@NgModule({
  imports: [NgContextModule]
})
export class AppModule {}
```

Declare and consume context:

```html
<ng-container ngContext="theme" [value]="'red'">
  <div *ngContext="let theme consume 'theme'" [style.color]="theme">
    Themed text color
  </div>
</ng-container>
```
