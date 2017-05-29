import { G7TokenPage } from './app.po';

describe('g7-token App', () => {
  let page: G7TokenPage;

  beforeEach(() => {
    page = new G7TokenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
