import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, Page } from 'playwright';
import { CheckboxesPage } from '../pages/CheckboxesPage';

export class TestWorld extends World{
        browser!:Browser;    
        page!:Page;
        checkboxesPage!:CheckboxesPage;

    constructor(options:IWorldOptions){
        super(options);
    }
}

setWorldConstructor(TestWorld);