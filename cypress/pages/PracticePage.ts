import { HoverOption } from '../constants';

export class PracticePage {
  readonly HOME_BUTTON_TEXT = 'Home';
  readonly OPEN_WINDOW_BUTTON_TEXT = 'Open Window';
  readonly OPEN_TAB_LINK_TEXT = 'Open Tab';
  readonly ENTER_YOUR_NAME_PLACEHOLDER_TEXT = 'Enter Your Name';
  readonly HIDDEN_INPUT_PLACEHOLDER_TEXT = 'Hide/Show Example';
  readonly ALERT_INPUT_TEXT = 'Alert';
  readonly CONFIRM_INPUT_TEXT = 'Confirm';
  readonly HIDE_INPUT_TEXT = 'Hide';
  readonly SHOW_INPUT_TEXT = 'Show';
  readonly HOVER_BUTTON_TEXT = 'Mouse Hover';
  readonly TOP_OPTION_TEXT = 'Top';
  readonly RELOAD_OPTION_TEXT = 'Reload';

  private readonly DROPDOWN_SELECTOR = '#dropdown-class-example';
  private readonly HOVER_CONTENT_SELECTOR = '.hover-content';

  homeMenuItem(): Cypress.Chainable<JQuery<HTMLAnchorElement>> {
    return cy.get('header div > a').should('have.length', 4).eq(0);
  }

  dropdown(): Cypress.Chainable<JQuery<HTMLSelectElement>> {
    return cy.get(this.DROPDOWN_SELECTOR);
  }

  dropdownOption(): Cypress.Chainable<JQuery<HTMLOptionElement>> {
    return cy.get(`${this.DROPDOWN_SELECTOR} option:is([value*="option"])`);
  }

  openWindowButton(): Cypress.Chainable<JQuery<HTMLButtonElement>> {
    return cy.get('#openwindow');
  }

  openTabLink(): Cypress.Chainable<JQuery<HTMLAnchorElement>> {
    return cy.get('#opentab');
  }

  enterYourNameInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy.get('#name');
  }

  alertInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy.get('#alertbtn');
  }

  confirmInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy.get('#confirmbtn');
  }

  getAlertMessage(name: string): string {
    return `Hello ${name}, share this practice page and share your knowledge`;
  }

  getConfirmMessage(name: string): string {
    return `Hello ${name}, Are you sure you want to confirm?`;
  }

  hiddenInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy.get('#displayed-text');
  }

  hideTextBoxInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy.get('#hide-textbox');
  }

  showTextBoxInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy.get('#show-textbox');
  }

  hoverButton(): Cypress.Chainable<JQuery<HTMLButtonElement>> {
    return cy.get('.hover-btn');
  }

  hoverContent(): Cypress.Chainable<JQuery<HTMLDivElement>> {
    return cy.get(this.HOVER_CONTENT_SELECTOR);
  }

  hoverOption(option: HoverOption): Cypress.Chainable<JQuery<HTMLAnchorElement>> {
    return cy.get(`${this.HOVER_CONTENT_SELECTOR} a`).should('have.length', 2).eq(option);
  }

  socialMediaLink(): Cypress.Chainable<JQuery<HTMLAnchorElement>> {
    return cy.get('.gffoot ul a')
  }
}
