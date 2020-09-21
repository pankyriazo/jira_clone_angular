import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectI } from 'src/interfaces/project';
import { IssueList, IssueI } from 'src/interfaces/issue';
import { ProjectQuery } from 'src/state/project/project.query';
import { Subscription, Observable, of, concat, combineLatest } from 'rxjs';
import { tap, finalize, mergeMap, map } from 'rxjs/operators';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    host: {
        'class': 'w-full'
    }
})
export class BoardComponent implements OnInit, OnDestroy {
    private projectSubscription: Subscription;
    public project: ProjectI;
    // public issues$: Observable<{ title: string, issues: IssueI[] }[]>;
    public issues$: Observable<any[]>;
    public topBarFilterSearch: string;

    constructor(
        private projectQuery: ProjectQuery
    ) { }

    ngOnInit() {
        this.projectSubscription = this.projectQuery.select().pipe(
                tap(project => {
                    this.project = project;
                })
            ).subscribe();

        this.issues$ = combineLatest(
                of(Object.values(IssueList)),
                this.projectQuery.issues$,
            ).pipe(
                map((x) => {
                    return x[0].map(listTitle => ({
                        listTitle,
                        issues: x[1].filter(issue => issue.list === listTitle)
                    }));
                })
            );
    }

    ngOnDestroy() {
        this.projectSubscription.unsubscribe();
    }

}
