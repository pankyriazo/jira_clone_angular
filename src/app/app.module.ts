import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from 'src/app/state/project/project.service';
import { QuillModule } from 'ngx-quill'
import { IssueEditComponent } from 'src/app/components/issue-edit/issue-edit.component';
import { IssueCreateComponent } from 'src/app/components/issue-create/issue-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        IssueEditComponent,
        IssueCreateComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        BrowserAnimationsModule,
        HttpClientModule,
        QuillModule.forRoot(),
        environment.production ? [] : AkitaNgDevtools.forRoot()
    ],
    providers: [
        ProjectService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        IssueEditComponent,
        IssueCreateComponent
    ]
})
export class AppModule { }
