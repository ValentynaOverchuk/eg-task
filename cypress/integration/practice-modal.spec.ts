import { easygeneratorUrl, HoverOption, practicePage } from '../constants';
import { typeNameInTheInput } from '../utils/generalActions';

describe('Practice Page', () => {
  const MY_NAME = 'Valia';

  beforeEach(() => {
    cy.visit('/');
  });

  it('should properly display the Home button', () => {
    practicePage.homeMenuItem().should(button => {
      expect(button.text().trim()).to.eq(practicePage.HOME_BUTTON_TEXT);
      expect(button).to.attr('href', `${easygeneratorUrl}/`);
    });
  });

  context('Dropdown Example', () => {
    it('should properly display the dropdown option', () => {
      practicePage
        .dropdownOption()
        .should('be.visible')
        .and('have.length', 3)
        .each((option, index) => {
          expect(option.text()).to.eq(`Option${index + 1}`);
        });
    });

    it('should allow the user to change option', () => {
      practicePage.dropdown().should('have.value', '');
      practicePage.dropdown().select(1);
      practicePage.dropdown().should('have.value', 'option1');
    });
  });

  it('should open a new window by clicking Open Window button', () => {
    cy.window().then(win => {
      cy.stub(win, 'open').as('windowOpen');
    });
    practicePage
      .openWindowButton()
      .should('have.text', practicePage.OPEN_WINDOW_BUTTON_TEXT)
      .click();
    cy.get('@windowOpen').should('be.calledWith', easygeneratorUrl);
  });

  it('should open a new tab by clicking Open Tab link', () => {
    practicePage.openTabLink().should(link => {
      expect(
        link
          .text()
          .replace(/\n/g, '')
          .replace(/\s+/g, ' ')
      ).to.eq(practicePage.OPEN_TAB_LINK_TEXT);
      expect(link).to.attr('target', '_blank');
      expect(link).to.attr('href', `${easygeneratorUrl}/`);
    });
  });

  it('should show a message with the name by clicking Alert input', () => {
    const alertShown = cy.stub().as('alertShown');
    cy.on('window:alert', alertShown);

    typeNameInTheInput(MY_NAME);
    practicePage
      .alertInput()
      .should('have.value', practicePage.ALERT_INPUT_TEXT)
      .click();
    cy.get('@alertShown').should('have.been.calledOnceWith', practicePage.getAlertMessage(MY_NAME));
  });

  it('should show a message with the name by clicking Confirm input', () => {
    const confirmShown = cy.stub().as('confirmShown');
    cy.on('window:confirm', confirmShown);

    typeNameInTheInput(MY_NAME);
    practicePage
      .confirmInput()
      .should('have.value', practicePage.CONFIRM_INPUT_TEXT)
      .click();
    cy.get('@confirmShown').should('have.been.calledOnceWith', practicePage.getConfirmMessage(MY_NAME));
  });

  it('should show a message with text from the alert-text.txt file', () => {
    const alertText = cy.task('readFile', 'alert-text.txt');
    const alertShown = cy.stub().as('alertShown');

    cy.on('window:alert', alertShown);

    cy.window().then(win => {
      win.alert(alertText);
    });

    cy.get('@alertShown').should('have.been.calledOnceWith', alertText);
  });

  it('should hide/show the input by clicking Hide/Show input', () => {
    practicePage
      .hiddenInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', practicePage.HIDDEN_INPUT_PLACEHOLDER_TEXT);
    practicePage
      .hideTextBoxInput()
      .should('have.value', practicePage.HIDE_INPUT_TEXT)
      .click();
    practicePage.hiddenInput().should('not.be.visible');
    practicePage
      .showTextBoxInput()
      .should('have.value', practicePage.SHOW_INPUT_TEXT)
      .click();
    practicePage.hiddenInput().should('be.visible');
  });

  it('should show the option by hovering Mouse Hover button', () => {
    practicePage.hoverContent().should('not.be.visible');
    practicePage
      .hoverButton()
      .should('have.text', practicePage.HOVER_BUTTON_TEXT)
      .realHover();
    practicePage.hoverContent().should('be.visible');
    practicePage.hoverButton().realMouseMove(200, 200);
    practicePage.hoverContent().should('not.be.visible');
  });

  it('should show the option by hovering Mouse Hover button', () => {
    practicePage.hoverContent().should('not.be.visible');
    practicePage
      .hoverButton()
      .should('have.text', practicePage.HOVER_BUTTON_TEXT)
      .realHover();
    practicePage.hoverContent().should('be.visible');
    practicePage.hoverOption(HoverOption.Top).should('have.text', practicePage.TOP_OPTION_TEXT);
    practicePage.hoverOption(HoverOption.Reload).should('have.text', practicePage.RELOAD_OPTION_TEXT);
    practicePage.hoverButton().realMouseMove(200, 200);
    practicePage.hoverContent().should('not.be.visible');
  });

  it('should display the logo in iframe', () => {
    cy.get('#courses-iframe').then(iframe => {
      const body = iframe.contents().find('body');
      expect(body.find('.header__logo')).to.be.visible;
      expect(body.find('.header__logo')).to.attr('href', 'https://www.easygenerator.com/en/');
    });
  });

  context('Social Media', () => {
    [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/easygenerator/'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/easygenerator'
      },
      {
        name: 'Google+',
        url: '#'
      },
      {
        name: 'Youtube',
        url: 'https://www.youtube.com/user/easygenerator'
      }
    ].forEach((config, index) => {
      it(`should properly display the ${config.name} link`, () => {
        practicePage
          .socialMediaLink()
          .should('have.length', 4)
          .eq(index)
          .should('have.attr', 'href', config.url)
          .and('have.text', config.name);
      });
    });
  });
});
