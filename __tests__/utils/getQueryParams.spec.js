import { getQueryParams } from '../../src/utils';

describe('Vue query normalizer', () => {
  describe('getQueryParams', () => {
    it('should get params', () => {
      const options = {
        simple: {
          type: String,
        },

        number: {
          type: Number,
        },

        number2: {
          type: Number,
        },
      };

      const params = {
        simple: 'str',
        number: 23,
        number2: 23,
      };

      const oldQuery = {
        old: 'old',
      };

      const expected = {
        simple: 'str',
        number: '23',
        number2: '23',
        old: 'old',
      };

      expect(getQueryParams(options, params, oldQuery)).toEqual(expected);
    });

    it('should get params with default values', () => {
      const options = {
        simple: {
          type: String,
          default: 'str',
        },

        number: {
          type: Number,
          default: 23,
        },
      };

      const params = {
        simple: 'str',
        number: 23,
      };

      const oldQuery = {};

      const expected = {};

      expect(getQueryParams(options, params, oldQuery)).toEqual(expected);
    });

    it('should not remove old', () => {
      const options = {
        simple: {
          type: String,
          default: 'str',
        },
      };

      const params = {
        simple: 'str',
      };

      const oldQuery = {
        old: 'old',
      };

      const expected = {
        old: 'old',
      };

      expect(getQueryParams(options, params, oldQuery)).toEqual(expected);
    });

    it('should get params with custom compare', () => {
      const options = {
        array: {
          type: Array,
          default: () => [123],
          compare: (value, defaultValue) => String(value) === String(defaultValue),
        },

        array2: {
          type: Array,
          default: () => [123],
          out: value => value.join(','),
          compare: (value, defaultValue) => String(value) === String(defaultValue),
        },
      };

      const params = {
        array: [123],
        array2: [1234, 5678],
      };

      const oldQuery = {};

      const expected = {
        array2: '1234,5678',
      };

      expect(getQueryParams(options, params, oldQuery)).toEqual(expected);
    });

    it('should delete falsy values', () => {
      const options = {
        simple: {
          type: String,
        },

        number: {
          type: Number,
        },

        number2: {
          type: Number,
        },
      };

      const params = {
        simple: undefined,
        number: null,
        number2: false,
      };

      const expected = {};

      expect(getQueryParams(options, params)).toEqual(expected);
    });
  });
});
