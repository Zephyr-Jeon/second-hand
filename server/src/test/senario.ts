import { aa, ae, ba, be } from './common';

beforeAll(ba);
afterAll(aa);

describe('Sample test suite', () => {
  beforeEach(be);
  afterEach(ae);

  test('Initial test', () => {
    expect(2).toEqual(2);
  });
});
