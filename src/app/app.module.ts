import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperHeroeComponentComponent } from './super-heroe-component/super-heroe-component.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { getSpanishPaginatorIntl } from './utils/paginatorTranslator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SuperHeroeFormDetailComponent } from './super-heroe-component/super-heroe-form-detail-component/super-heroe-form-detail/super-heroe-form-detail.component';
import { ConfirmationDialogComponentComponent } from './utils/confirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { UppercaseDirective } from './utils/uppercase.directive';
import { DefaultPipe } from './utils/defaultPipe';

@NgModule({
  declarations: [
    AppComponent,
    SuperHeroeComponentComponent,
    SuperHeroeFormDetailComponent,
    ConfirmationDialogComponentComponent,
    UppercaseDirective,
    DefaultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [ 
    {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
