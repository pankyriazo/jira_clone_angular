import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectI } from 'src/app/interfaces/project';
import { UserI } from 'src/app/interfaces/user';
import { IssueList, IssuePriorityIcons, IssuePriorityColors, IssueCategoryIcons, IssueCategoryColors, IssueI } from 'src/app/interfaces/issue';
import { ProjectQuery } from 'src/app/state/project/project.query';
import { Subscription, Observable, of, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NavbarQuery } from 'src/app/state/navbar/navbar.query';
import { NavbarService } from 'src/app/state/navbar/navbar.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/state/project/project.service';
import { ModalService } from 'src/app/providers/modal.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    host: {
        'class': 'w-full'
    }
})
export class BoardComponent implements OnInit, OnDestroy {
    public issuePriorityIcons = IssuePriorityIcons;
    public issuePriorityColors = IssuePriorityColors;
    public issueCategoryIcons = IssueCategoryIcons;
    public issueCategoryColors = IssueCategoryColors;

    private projectSubscription: Subscription;
    public project: ProjectI;
    public issueLists$: Observable<{ title: string, issues: IssueI[] }[]>;
    public topBarFilterSearch: string;

    constructor(
        private projectQuery: ProjectQuery,
        private projectService: ProjectService,
        public navbarQuery: NavbarQuery,
        public navbarService: NavbarService,
        public modalService: ModalService
    ) { }

    ngOnInit() {
        this.projectSubscription = this.projectQuery.select().pipe(
                tap(project => {
                    this.project = project;
                })
            ).subscribe();

        this.issueLists$ = combineLatest(
                            of(Object.values(IssueList)),
                            this.projectQuery.issues$,
                        ).pipe(
                            map(([lists, issues]) => {
                                return lists.map(title => ({
                                    title,
                                    issues: issues
                                                .filter(issue => issue.list === title)
                                                .sort((a, b) => (+a.listPosition) - (+b.listPosition))
                                }));
                            })
                        );
    }

    ngOnDestroy() {
        this.projectSubscription.unsubscribe();
    }


    public getIssueReporter$(issue: IssueI): Observable<UserI> {
        return this.projectQuery.users$.pipe(
            map(users => users.find(user => issue.reporterId.includes(user.id)))
        )
    }


    public drop(event: CdkDragDrop<IssueI[]>): void {
        const newIssues: IssueI[] = [...event.container.data];
        if (event.previousContainer === event.container) {
            moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
            newIssues.forEach((issue, index) => {
                const newIssue: IssueI = {
                    ...issue,
                    listPosition: index + 1,
                    updatedAt: new Date().toISOString()
                };
                this.projectService.updateIssue(newIssue);
            });
        } else {
            transferArrayItem(event.previousContainer.data, newIssues, event.previousIndex, event.currentIndex);
            newIssues.forEach((issue, index) => {
                const newIssue: IssueI = {
                    ...issue,
                    list: issue.id === event.item.data.id ? event.container.id as IssueList : issue.list,
                    listPosition: index + 1,
                    updatedAt: new Date().toISOString()
                };
                this.projectService.updateIssue(newIssue);
            });
        }
    }

}
