import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    public searchSubject: Subject<void> = new Subject();

    constructor() { }
}
