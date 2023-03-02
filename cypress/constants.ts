import { PracticePage } from './pages/PracticePage';

export const practicePage = new PracticePage();
export const easygeneratorUrl = Cypress.env('easygeneratorUrl') as string;

export enum HoverOption {
  Top = 0,
  Reload = 1
}
