import { checkType } from '../../src/utils';

describe('Vue query normalizer', () => {
  describe('checkType', () => {
    it('should show warning if type error', () => {
      const key = 'simple';

      const option = {
        type: Number,
      };

      const value = '23';

      const spy = jest.spyOn(global.console, 'warn');

      checkType(key, option, value);

      expect(spy).toHaveBeenCalledWith('Query type error!', key, value);
    });

    it('should not show warning', () => {
      const key = 'simple';

      const option = {
        type: Number,
      };

      const value = 23;

      const spy = jest.spyOn(global.console, 'warn');

      checkType(key, option, value);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not show warning if has no value', () => {
      const key = 'simple';

      const option = {
        type: Number,
      };

      const spy = jest.spyOn(global.console, 'warn');

      checkType(key, option);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
