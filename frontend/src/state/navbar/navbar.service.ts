import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarStore } from './navbar.store';
import { Navbar } from './navbar.store';

@Injectable({ providedIn: 'root' })
export class NavbarService {

    constructor(
        private navbarStore: NavbarStore,
    ) {}

    update(navbar: Partial<Navbar>) {
        this.navbarStore.update(state => {
            return {
                ...state,
                ...navbar
            }
        });
    }
}
