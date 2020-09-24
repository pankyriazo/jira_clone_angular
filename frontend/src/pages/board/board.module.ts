import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrModalModule } from '@clr/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IssueEditComponent } from 'src/components/issue-edit/issue-edit.component';
import { QuillModule } from 'ngx-quill';



@NgModule({
    declarations: [
        BoardComponent,
        IssueEditComponent
    ],
    imports: [
        CommonModule,
        BoardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        ClrModalModule,
        DragDropModule,
        QuillModule
    ],
    entryComponents: [
        IssueEditComponent
    ]
})
export class BoardModule { }
