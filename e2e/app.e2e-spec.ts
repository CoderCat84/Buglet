import { BugletPage } from './app.po';

describe('buglet App', function() {
  let page: BugletPage;

  beforeEach(() => {
    page = new BugletPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
