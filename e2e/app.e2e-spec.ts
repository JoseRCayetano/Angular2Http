import { Angular2youtubePage } from './app.po';

describe('angular2youtube App', () => {
  let page: Angular2youtubePage;

  beforeEach(() => {
    page = new Angular2youtubePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
