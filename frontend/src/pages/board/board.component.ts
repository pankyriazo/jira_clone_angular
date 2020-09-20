import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    public topBarFilterSearch: string;

    constructor() { }

    ngOnInit(): void {
        this.topBarFilterSearch = '';
    }

}
