import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    LayoutModule,
    MatGridListModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  exports: [
    MatCardModule,
    LayoutModule,
    MatGridListModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
