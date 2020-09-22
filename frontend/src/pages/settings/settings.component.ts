import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectI } from 'src/interfaces/project';
import { ProjectQuery } from 'src/state/project/project.query';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectCategory } from 'src/interfaces/project';
import { ProjectStore } from 'src/state/project/project.store';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
    private projectSubscription: Subscription;
    public project: ProjectI;
    public form: FormGroup;

    constructor(
        private projectQuery: ProjectQuery,
        private projectStore: ProjectStore
    ) {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            category: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit(): void {
        this.projectSubscription = this.projectQuery.select().pipe(
            tap(project => {
                this.project = project;
                this.form.patchValue({
                    name: project.name,
                    category: project.category
                });
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.projectSubscription.unsubscribe();
    }

    public get categories(): string[] {
        return Object.values(ProjectCategory);
    }

    public save(): void {
        this.projectStore.update({
            name: this.form.get('name').value,
            category: this.form.get('category').value
        });
        this.form.markAsPristine();
    }

}
