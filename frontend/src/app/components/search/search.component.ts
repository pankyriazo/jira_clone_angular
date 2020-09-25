import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ProjectQuery } from 'src/app/state/project/project.query';
import { Observable, fromEvent, Subscription, combineLatest } from 'rxjs';
import { IssueI, IssueCategoryIcons, IssueCategoryColors } from 'src/app/interfaces/issue';
import { map, pluck, debounceTime, distinctUntilChanged, switchMap, tap, take } from 'rxjs/operators';
import { strict } from 'assert';
import { SearchService } from 'src/app/providers/search.service';
import { ModalService } from 'src/app/providers/modal.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
    public isOpen: boolean;
    public searchResults: IssueI[];
    public recentIssues$: Observable<IssueI[]>;
    public issueCategoryIcons = IssueCategoryIcons;
    public issueCategoryColors = IssueCategoryColors;
    @ViewChild('searchInput') private searchInput: ElementRef;
    private searchSubscription: Subscription;

    constructor(
        private projectQuery: ProjectQuery,
        public searchService: SearchService,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.recentIssues$ = this.projectQuery.issues$.pipe(
            map(issues => issues.slice().sort((a, b) => {
                const aDate = new Date(a.updatedAt);
                const bDate = new Date(b.updatedAt);

                return (aDate < bDate) ? 1 : ((aDate > bDate) ? -1 : 0);
            }))
        );
    }

    ngAfterViewInit() {
        this.searchSubscription = fromEvent(this.searchInput.nativeElement, 'input').pipe(
            pluck('target', 'value'),
            debounceTime(500),
            distinctUntilChanged(),
            tap((searchValue: string) => {
                if (searchValue === '') {
                    this.searchResults = undefined;
                    return;
                }

                this.projectQuery.issues$.pipe(
                    take(1),
                    tap(issues => {
                        this.searchResults = issues.filter(issue => issue.title.toLowerCase().includes(searchValue.toLowerCase()) || issue.description.toLowerCase().includes(searchValue.toLowerCase()));
                    })
                ).subscribe();
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }

    public open(): void {
        this.isOpen = true;

        setTimeout(() => {
            (<HTMLInputElement> this.searchInput.nativeElement).focus();
        }, 500);
    }

    public reset(): void {
        (<HTMLInputElement> this.searchInput.nativeElement).value = '';
        this.searchResults = undefined;
        this.isOpen = false;
    }

    public openIssue(issue: IssueI): void {
        this.modalService.issueEditSubject.next(issue);
        this.reset();
    }

}
