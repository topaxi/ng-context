import * as utils from './utils';

describe('utils', () => {
  describe('byName()', () => {
    it('should filter by name', () => {
      expect(
        [{ name: 'hallo' }, { name: 'welt' }].filter(utils.byName('welt'))
      ).toEqual([{ name: 'welt' }]);
      expect(
        [{ name: 'hallo' }, { name: 'welt' }].find(utils.byName('welt'))
      ).toEqual({ name: 'welt' });
    });
  });
});
