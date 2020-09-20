import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    @Input() navbarRightExpanded: boolean;
    @Output() navbarRightManualToggle = new EventEmitter();

    constructor() {}

    public get navbarRightWidth() : number {
        return this.navbarRightExpanded ? 330 : 18;
    }

    public get expandToggleIcon() : string {
        return 'angle ' + (this.navbarRightExpanded ? 'left' : 'right');
    }

    public toggleNavbarRight(): void {
        this.navbarRightManualToggle.emit();
    }

}
