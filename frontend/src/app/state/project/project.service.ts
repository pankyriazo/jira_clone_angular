import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectStore } from './project.store';
import { tap, catchError, delay, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProjectI } from 'src/app/interfaces/project';
import { IssueI } from 'src/app/interfaces/issue';
import { arrayUpsert } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ProjectService {

    constructor(
        private projectStore: ProjectStore,
        private http: HttpClient
    ) {}

    public getProject(): void {
        this.http.get<ProjectI>('assets/data/project.json')
            .pipe(
                tap(() => {
                    this.projectStore.setLoading(true);
                }),
                delay(1000),
                tap(project => {
                    this.projectStore.update(state => {
                        return {
                            ...state,
                            ...project
                        };
                    })
                }),
                finalize(() => {
                    this.projectStore.setLoading(false);
                }),
                catchError(error => {
                    this.projectStore.setError(error);
                    return of(error);
                })
            )
            .subscribe();
    }

    public updateProject(project: Partial<ProjectI>) {
        this.projectStore.update(state => {
            return {
                ...state,
                ...project
            }
        });
    }

    public updateIssue(issue: IssueI): void {
        this.projectStore.update(state => {
            console.log(issue)
            const newIssues: IssueI[] = arrayUpsert(state.issues, issue.id, issue);
            return {
                ...state,
                issues: newIssues
            };
        })
    }
}
