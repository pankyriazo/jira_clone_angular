import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/state/project/project.service';
import { ProjectQuery } from 'src/state/project/project.query';
import { NavbarQuery } from 'src/state/navbar/navbar.query';
import { NavbarService } from 'src/state/navbar/navbar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private projectService: ProjectService,
        public projectQuery: ProjectQuery,
        public navbarQuery: NavbarQuery,
        public navbarService: NavbarService
    ) {}

    ngOnInit() {
        this.projectService.getProject();
        this.navbarRightHandleOnResize();
    }

    private navbarRightHandleOnResize(): void {
        window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
            this.navbarService.update({
                expanded: e.matches
            });
        });
    }
}
