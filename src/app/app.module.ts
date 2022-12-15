import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, TaskComponent, NotFoundComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
