import { isEqual } from '../src/utils';

describe('isEqual', function () {
  it('should patch has new values', function () {
    expect(isEqual({ a : {} }, { a: 1 }, { a: 1, b: 2 })).toBe(true);
  });

  it('should patch has not new values', function () {
    expect(isEqual({ a : {} }, { a: 1 }, { b: 2 })).toBe(false);
  });
});
