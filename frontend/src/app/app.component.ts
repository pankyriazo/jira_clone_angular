import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/state/project/project.service';
import { ProjectQuery } from 'src/state/project/project.query';
import { NavbarQuery } from 'src/state/navbar/navbar.query';
import { NavbarService } from 'src/state/navbar/navbar.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private titleSubscription: Subscription;

    constructor(
        private projectService: ProjectService,
        public projectQuery: ProjectQuery,
        public navbarQuery: NavbarQuery,
        public navbarService: NavbarService,
        public title: Title
    ) {}

    ngOnInit() {
        this.projectService.getProject();
        this.navbarRightHandleOnResize();
        this.titleSubscription = this.projectQuery.all$.pipe(
            tap(project => this.title.setTitle(project.name || 'Loading...'))
        ).subscribe();
    }

    ngOnDestroy() {
        this.titleSubscription.unsubscribe();
    }

    private navbarRightHandleOnResize(): void {
        window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
            this.navbarService.update({
                expanded: e.matches
            });
        });
    }

}
