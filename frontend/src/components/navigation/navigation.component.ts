import { Component } from '@angular/core';
import { navbarLeftActions } from 'src/config/navigation/navbarLeftActions';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    public objectKeys = Object.keys;

    constructor() {}

    public getNavbarLeftActions() {
        console.log(navbarLeftActions)
        return navbarLeftActions;
    }

}
