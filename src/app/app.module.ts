import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import {SaveDataService} from './save-data.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SaveDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
