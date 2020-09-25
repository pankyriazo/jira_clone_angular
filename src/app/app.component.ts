import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/state/project/project.service';
import { ProjectQuery } from 'src/app/state/project/project.query';
import { NavbarQuery } from 'src/app/state/navbar/navbar.query';
import { NavbarService } from 'src/app/state/navbar/navbar.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IssueEditComponent } from 'src/app/components/issue-edit/issue-edit.component';
import { IssueCreateComponent } from 'src/app/components/issue-create/issue-create.component';
import { ModalService } from './providers/modal.service';
import { IssueI } from './interfaces/issue';
import { SearchService } from './providers/search.service';
import { SearchComponent } from './components/search/search.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private titleSubscription: Subscription;

    @ViewChild(IssueEditComponent) public issueEditComponent: IssueEditComponent;
    @ViewChild(IssueCreateComponent) public issueCreateComponent: IssueCreateComponent;
    @ViewChild(SearchComponent) public searchComponent: SearchComponent;

    constructor(
        private projectService: ProjectService,
        public projectQuery: ProjectQuery,
        public navbarQuery: NavbarQuery,
        public navbarService: NavbarService,
        private modalService: ModalService,
        private searchService: SearchService,
        public title: Title
    ) {}

    ngOnInit() {
        this.projectService.getProject();
        this.navbarRightHandleOnResize();
        this.titleSubscription = this.projectQuery.all$.pipe(
            tap(project => this.title.setTitle(project.name || 'Loading...'))
        ).subscribe();

        this.modalService.issueEditSubject.subscribe(
            (issue: IssueI) => this.issueEditComponent.open(issue)
        )

        this.modalService.issueCreateSubject.subscribe(
            () => this.issueCreateComponent.open()
        )

        this.searchService.searchSubject.subscribe(
            () => this.searchComponent.open()
        )
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

    public issueCreate(): void {
        this.issueCreateComponent.open();
    }

}
