import { Ng2Angular2Page } from './app.po';

describe('ng2-angular2 App', function() {
  let page: Ng2Angular2Page;

  beforeEach(() => {
    page = new Ng2Angular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
