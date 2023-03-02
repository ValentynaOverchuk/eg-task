import { practicePage } from '../constants';

export const typeNameInTheInput = (name: string) => {
  practicePage
    .enterYourNameInput()
    .should('have.attr', 'placeholder', practicePage.ENTER_YOUR_NAME_PLACEHOLDER_TEXT)
    .type(name)
    .should('have.value', name);
};
