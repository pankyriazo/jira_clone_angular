import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IssueI } from '../interfaces/issue';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    public issueEditSubject: Subject<IssueI> = new Subject();
    public issueCreateSubject: Subject<void> = new Subject();

    constructor() { }
}
