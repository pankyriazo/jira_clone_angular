import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { IssueI, IssueCategory, IssueList, IssuePriority } from 'src/app/interfaces/issue';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectQuery } from 'src/app/state/project/project.query';
import { ProjectService } from 'src/app/state/project/project.service';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/interfaces/user';
import { map, tap, take } from 'rxjs/operators';

@Component({
    selector: 'app-issue-create',
    templateUrl: './issue-create.component.html',
    styleUrls: ['./issue-create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IssueCreateComponent implements OnInit, OnDestroy {
    public isOpen: boolean;
    public issue: IssueI;
    public form: FormGroup;
    public quillModules: any;
    public formSubmissionError: boolean;

    constructor(
        public projectQuery: ProjectQuery,
        private projectService: ProjectService
    ) {
        this.form = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', []),
            list: new FormControl('', [Validators.required]),
            category: new FormControl('', [Validators.required]),
            priority: new FormControl('', [Validators.required]),
            reporter: new FormControl('', [Validators.required]),
            users: new FormControl([], [])
        });
    }

    ngOnInit(): void {
        this.isOpen = false;
        this.formSubmissionError = false;
        this.quillModules = {
            'toolbar': [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
        };
    }

    ngOnDestroy() {
        this.form.reset();
    }

    public open(): void {
        this.isOpen = true;
    }

    public get categories(): string[] {
        return Object.values(IssueCategory);
    }

    public get lists(): string[] {
        return Object.values(IssueList);
    }

    public get priorities(): string[] {
        return Object.values(IssuePriority);
    }

    public getSelectedUsers$(): Observable<UserI[]> {
        return this.projectQuery.users$.pipe(
            map(users => users.filter(user => this.form ? this.form.get('users').value ? this.form.get('users').value.includes(user.id) : [] : []))
        )
    }

    public getRemainingUsers$(): Observable<UserI[]> {
        return this.projectQuery.users$.pipe(
            map(users => users.filter(user => this.form ? this.form.get('users').value ? !this.form.get('users').value.includes(user.id) : [] : []))
        )
    }

    public selectUser(userId: string): void {
        this.form.patchValue({
            users: [
                ...this.form.get('users').value,
                userId
            ]
        });
    }

    public deselectUser(userId: string): void {
        this.form.patchValue({
            users: [...this.form.get('users').value].filter(selectedUser => selectedUser !== userId)
        });
    }

    public cancel(): void {
        this.isOpen = false;
    }

    public save(): void {
        if (this.form.invalid) {
            this.formSubmissionError = true;
            return;
        }
        if (this.form.untouched) {
            this.isOpen = false;
            return;
        }

        this.projectQuery.issues$.pipe(
            take(1),
            map(issues => {
                return issues.filter(issue => issue.category === this.form.get('category').value)
            })
        ).subscribe(
            (issues: IssueI[]) => {
                const dateNow = new Date().toISOString();

                const newIssue: IssueI = {
                    id: `ISSUE_${Math.ceil(Math.random() * 1000000000)}`,
                    list: this.form.get('list').value,
                    listPosition: issues.length + 1,
                    category: this.form.get('category').value,
                    priority: this.form.get('priority').value,
                    title: this.form.get('title').value,
                    description: this.form.get('description').value,
                    createdAt: dateNow,
                    updatedAt: dateNow,
                    reporterId: this.form.get('reporter').value,
                    userIds: this.form.get('users').value
                };
                this.projectService.updateIssue(newIssue);

                this.isOpen = false;
            }
        );
    }

}
