import { DemoCliPage } from './app.po';

describe('demo-cli App', function() {
  let page: DemoCliPage;

  beforeEach(() => {
    page = new DemoCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
