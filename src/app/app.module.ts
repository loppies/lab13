import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import pl from '@angular/common/locales/pl';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

registerLocaleData(pl);

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLuxonDateModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  declarations: [AppComponent, TaskComponent, NotFoundComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
