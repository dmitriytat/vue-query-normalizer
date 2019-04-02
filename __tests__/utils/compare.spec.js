import { compare } from '../../src/utils';

describe('Vue query normalizer', () => {
  describe('compare', () => {
    it('should compare simple value', () => {
      expect(compare({ default: 23 }, 23)).toBeTruthy();
      expect(compare({ default: 23 }, 45)).toBeFalsy();

      expect(compare({ default: 'hello' }, 'hello')).toBeTruthy();
      expect(compare({ default: 'hello' }, 'hi')).toBeFalsy();

      expect(compare({ default: true }, true)).toBeTruthy();
      expect(compare({ default: false }, true)).toBeFalsy();
    });

    it('should compare with custom default', () => {
      const option = {
        default: () => 'hi',
      };

      expect(compare(option, 'hi')).toBeTruthy();
    });

    it('should compare with custom compare', () => {
      const option = {
        default: ['hello'],
        compare: (value, defaultValue) => String(value) === String(defaultValue),
      };

      expect(compare(option, ['hello'])).toBeTruthy();
    });

    it('should compare with custom default and compare', () => {
      const option = {
        default: () => ['hi'],
        compare: (value, defaultValue) => String(value) === String(defaultValue),
      };

      expect(compare(option, ['hi'])).toBeTruthy();
    });
  });
});
