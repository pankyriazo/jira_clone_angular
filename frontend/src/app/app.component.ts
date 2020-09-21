import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/state/project/project.service';
import { ProjectQuery } from 'src/state/project/project.query';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public navbarRightExpanded: boolean;

    constructor(
        private projectService: ProjectService,
        public projectQuery: ProjectQuery
    ) {}

    ngOnInit() {
        this.projectService.getProject();
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
