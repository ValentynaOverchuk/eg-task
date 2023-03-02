// NOTE: trigger('mouseover') doesn't work in some tests
import 'cypress-real-events';

beforeEach(() => {
  cy.intercept(
    {
      url: /\/modules/,
      method: 'GET',
      middleware: true
    },
    req => {
      if (!req.headers.origin) {
        req.headers.origin = req.url.includes('token')
          ? 'https://easygenerator.com'
          : (Cypress.config('baseUrl') as string);

        req.continue();
      }
    }
  );
});
