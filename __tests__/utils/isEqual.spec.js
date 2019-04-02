import { isEqual } from '../../src/utils';

describe('Vue query normalizer', () => {
  describe('isEqual', () => {
    it('should patch has new values', () => {
      expect(isEqual({ a: {} }, { a: 1 }, { a: 1, b: 2 })).toBe(true);
    });

    it('should patch has not new values', () => {
      expect(isEqual({ a: {} }, { a: 1 }, { b: 2 })).toBe(false);
    });
  });
});
