import { AbsTSPage } from './app.po';

describe('abs-ts App', () => {
  let page: AbsTSPage;

  beforeEach(() => {
    page = new AbsTSPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
