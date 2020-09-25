import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { NavbarStore, NavbarState } from './navbar.store';

@Injectable({ providedIn: 'root' })
export class NavbarQuery extends QueryEntity<NavbarState> {
    public isExpanded$ = this.select('expanded');

    constructor(protected store: NavbarStore) {
        super(store);
    }

}
