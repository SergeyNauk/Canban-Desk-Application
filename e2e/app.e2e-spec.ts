import { CanbanDeskPage } from './app.po';

describe('canban-desk App', () => {
  let page: CanbanDeskPage;

  beforeEach(() => {
    page = new CanbanDeskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
