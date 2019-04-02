import { getQueryValues } from '../../src/utils';

describe('Vue query normalizer', () => {
  describe('getQueryValues', () => {
    it('should get values', () => {
      const options = {
        simple: {
          type: String,
        },

        simple2: {},

        number: {
          type: Number,
        },

        number2: {
          type: Number,
        },
      };

      const query = {
        simple: 'str',
        simple2: 'str',
        number: '23',
        number2: 23,
      };

      const expected = {
        simple: 'str',
        simple2: 'str',
        number: 23,
        number2: 23,
      };

      expect(getQueryValues(options, query)).toEqual(expected);
    });

    it('should set default values', () => {
      const options = {
        simple: {
          type: String,
          default: 'str',
        },

        number: {
          type: Number,
          default: 23,
        },

        array: {
          type: Array,
          default: () => [],
        },
      };

      const query = {};

      const expected = {
        simple: 'str',
        number: 23,
        array: [],
      };

      expect(getQueryValues(options, query)).toEqual(expected);
    });

    it('should get values from custom converter', () => {
      const options = {
        boolean: {
          type: Boolean,
          in: value => (value === true || value === 'true'),
        },

        boolean2: {
          type: Boolean,
          in: value => (value === true || value === 'true'),
        },
      };

      const query = {
        boolean: 'true',
        boolean2: true,
      };

      const expected = {
        boolean: true,
        boolean2: true,
      };

      expect(getQueryValues(options, query)).toEqual(expected);
    });
  });
});
