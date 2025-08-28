import { BasePage } from '../BasePage';

import { pimMenuItems } from '../../helper/menuItems/pimMenuItems';
import { PIMBasePage } from './PIMPage';

export class ReportsPage extends PIMBasePage {
    constructor(page) {
        super(page);
        this.menuItem = page.locator('nav.oxd-topbar-body-nav span');
    }
}