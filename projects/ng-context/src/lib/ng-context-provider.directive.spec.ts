import { NgContextProviderDirective } from './ng-context-provider.directive';

describe('NgContextProviderDirective', () => {
  let context: any;

  beforeEach(() => {
    context = {};
  });

  it('should set context name based on ngContext', () => {
    const directive = new NgContextProviderDirective(context, 'test');
    expect(context.name).toBe('test');
  });

  it('should update context value', () => {
    const directive = new NgContextProviderDirective(context, 'test');
    expect(context.value).toBeUndefined();
    directive.value = 'hello';
    expect(context.value).toBe('hello');
  });
});
