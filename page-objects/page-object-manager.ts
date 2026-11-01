import { Page } from '@playwright/test';
import { FormLayoutsPage } from './form-layoutspage';
import { DatePickerPage } from './date-pickerpage';
import { PageNavigation } from './pageNavigation';

export class PageObjectManager {

    readonly formLayoutsPage: FormLayoutsPage;
    readonly datePickerPage: DatePickerPage;
    readonly pageNavigation: PageNavigation;

    constructor(page: Page) {

        this.formLayoutsPage = new FormLayoutsPage(page);
        this.datePickerPage = new DatePickerPage(page);
        this.pageNavigation = new PageNavigation(page);
    }
}