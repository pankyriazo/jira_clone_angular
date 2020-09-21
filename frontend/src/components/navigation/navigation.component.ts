import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectI } from 'src/interfaces/project';
import { ProjectQuery } from 'src/state/project/project.query';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
    @Input() public navbarRightExpanded: boolean;
    @Output() navbarRightManualToggle = new EventEmitter();
    private projectSubscription: Subscription;
    public project: ProjectI;

    constructor(
        private projectQuery: ProjectQuery
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

    public get expandToggleIcon() : string {
        return 'angle ' + (this.navbarRightExpanded ? 'left' : 'right');
    }

    public toggleNavbarRight(): void {
        this.navbarRightManualToggle.emit();
    }

}
