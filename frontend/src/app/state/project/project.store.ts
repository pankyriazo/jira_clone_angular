import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { ProjectI } from 'src/app/interfaces/project';

const createInitialState = (): ProjectI => {
    return {
        users: [],
        issues: []
    } as ProjectI;
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'project' })
export class ProjectStore extends EntityStore<ProjectI> {

    constructor() {
        super(createInitialState());
    }

}

