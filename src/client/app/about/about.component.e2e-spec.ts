import { browser } from 'protractor';

describe('About', () => {

  beforeEach(async () => {
    return await browser.get('/about');
  });

  it('should have correct feature heading', () => {
    expect(browser.getTitle()).toEqual('About - Fusebox Angular Universal Starter');
  });

});