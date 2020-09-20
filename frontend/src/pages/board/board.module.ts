import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';



@NgModule({
    declarations: [
        BoardComponent
    ],
    imports: [
        CommonModule,
        BoardRoutingModule,
        FormsModule,
        ClarityModule
    ]
})
export class BoardModule { }
