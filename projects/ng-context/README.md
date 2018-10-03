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

## Inject current context

Inject the context a directive or component currently lives in.

```typescript
import { NgContextService } from 'ng-context';

@Component({ selector: 'my-component' })
export class MyComponent {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly context: NgContextService<unknown>) {}

  ngOnInit(): void {
    this.context.value$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      // context value changed
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
```
