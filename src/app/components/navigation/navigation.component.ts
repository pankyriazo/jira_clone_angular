import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ProjectI } from 'src/app/interfaces/project';
import { ProjectQuery } from 'src/app/state/project/project.query';
import { tap, first, map } from 'rxjs/operators';
import { NavbarQuery } from 'src/app/state/navbar/navbar.query';
import { NavbarService } from 'src/app/state/navbar/navbar.service';
import { ModalService } from 'src/app/providers/modal.service';
import { SearchService } from 'src/app/providers/search.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
    private projectSubscription: Subscription;
    public project: ProjectI;

    constructor(
        private projectQuery: ProjectQuery,
        public navbarQuery: NavbarQuery,
        public navbarService: NavbarService,
        public modalService: ModalService,
        public searchService: SearchService
    ) { }

    ngOnInit() {
        this.projectSubscription = this.projectQuery.select().pipe(
                tap(project => {
                    this.project = project;
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.projectSubscription.unsubscribe();
    }

    public get expandToggleIcon(): Observable<string> {
        return this.navbarQuery.isExpanded$.pipe(
            first(),
            map(isExpanded => {
                return 'angle ' + (isExpanded ? 'left' : 'right');
            })
        );
    }

    public toggleNavbarRight(): void {
        this.navbarQuery.isExpanded$.pipe(
            first(),
            tap(status => {
                this.navbarService.update({
                    expanded: !status
                });
            })
        ).subscribe()
    }

}
