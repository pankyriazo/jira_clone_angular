import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface Navbar {
    expanded: boolean;
}

export interface NavbarState extends EntityState<Navbar> {}

export function createInitialState() {
    return {
        expanded: true
    } as Navbar;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'navbar' })
export class NavbarStore extends EntityStore<NavbarState> {

    constructor() {
        super(createInitialState());
    }

}

