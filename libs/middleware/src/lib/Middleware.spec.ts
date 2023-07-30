import { middleware } from './Middleware';

describe('middleware', () => {
  it('should work', () => {
    expect(middleware()).toEqual('middleware');
  });
});
