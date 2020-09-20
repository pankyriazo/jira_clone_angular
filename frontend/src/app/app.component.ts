import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public navbarRightExpanded: boolean;

    ngOnInit() {
        this.navbarRightExpanded = true;
        this.navbarRightHandleOnResize();
    }

    private navbarRightHandleOnResize(): void {
        window.matchMedia('(min-width: 1024px)').addEventListener('change', e => this.navbarRightExpanded = e.matches);
    }

    public navbarRightManualToggle(): void {
        this.navbarRightExpanded = !this.navbarRightExpanded;
    }
}
