import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { IssueI, IssueCategory, IssueList, IssuePriority } from 'src/app/interfaces/issue';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/interfaces/user';
import { ProjectQuery } from 'src/app/state/project/project.query';
import { map } from 'rxjs/operators';
import { ProjectService } from 'src/app/state/project/project.service';

@Component({
    selector: 'app-issue-edit',
    templateUrl: './issue-edit.component.html',
    styleUrls: ['./issue-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IssueEditComponent implements OnInit, OnDestroy {
    public isOpen: boolean;
    public issue: IssueI;
    public form: FormGroup;
    public quillModules: any;

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

    public open(issue: IssueI): void {
        this.isOpen = true;
        this.issue = issue;

        this.form.patchValue({
            title: this.issue.title,
            description: this.issue.description,
            list: this.issue.list,
            category: this.issue.category,
            priority: this.issue.priority,
            reporter: this.issue.reporterId,
            users: this.issue.userIds
        });
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
        if (this.form.invalid) return;
        if (this.form.untouched) {
            this.isOpen = false;
            return;
        }

        const newIssue: IssueI = {
            ...this.issue,
            title: this.form.get('title').value,
            description: this.form.get('description').value,
            list: this.form.get('list').value,
            category: this.form.get('category').value,
            priority: this.form.get('priority').value,
            updatedAt: new Date().toISOString(),
            reporterId: this.form.get('reporter').value,
            userIds: this.form.get('users').value
        };
        this.projectService.updateIssue(newIssue);
        this.isOpen = false;
    }

}
