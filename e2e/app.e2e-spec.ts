import { TestTemplateTemplatePage } from './app.po';

describe('TestTemplate App', function() {
  let page: TestTemplateTemplatePage;

  beforeEach(() => {
    page = new TestTemplateTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
