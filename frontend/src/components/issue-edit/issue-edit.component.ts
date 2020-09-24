import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { IssueI, IssueCategory } from 'src/interfaces/issue';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserI } from 'src/interfaces/user';
import { ProjectQuery } from 'src/state/project/project.query';
import { map } from 'rxjs/operators';

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
        public projectQuery: ProjectQuery
    ) {
        this.form = new FormGroup({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            list: new FormControl(null, [Validators.required]),
            category: new FormControl(null, [Validators.required]),
            priority: new FormControl(null, [Validators.required]),
            estimate: new FormControl(null, [Validators.required]),
            createdAt: new FormControl(null, [Validators.required]),
            updatedAt: new FormControl(null, [Validators.required]),
            reporter: new FormControl(null, [Validators.required]),
            users: new FormControl(null, [Validators.required])
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
            createdAt: this.issue.createdAt,
            updatedAt: this.issue.updatedAt
        });
    }

    public get categories(): string[] {
        return Object.values(IssueCategory);
    }

    public getIssueReporter$(): Observable<UserI> {
        return this.projectQuery.users$.pipe(
            map(users => users.find(user => this.issue.userIds.includes(user.id)))
        )
    }

    public addBindingCreated(quill) {
        quill.keyboard.addBinding({
            key: 'b'
        }, (range, context) => {
            // tslint:disable-next-line:no-console
            console.log('KEYBINDING B', range, context)
        })

        quill.keyboard.addBinding({
            key: 'B',
            shiftKey: true
        }, (range, context) => {
            // tslint:disable-next-line:no-console
            console.log('KEYBINDING SHIFT + B', range, context)
        })
    }


    public cancel(): void {
        this.isOpen = false;
    }

    public save(): void {
        this.cancel();
    }

}
