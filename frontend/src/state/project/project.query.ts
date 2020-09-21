import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProjectStore } from './project.store';
import { ProjectI } from 'src/interfaces/project';

@Injectable({ providedIn: 'root' })
export class ProjectQuery extends QueryEntity<ProjectI> {
    public isLoading$ = this.selectLoading();
    public all$ = this.select();
    public users$ = this.select('users');
    public issues$ = this.select('issues');

    constructor(protected store: ProjectStore) {
        super(store);
    }


}
