import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    SelectButtonModule,
    ToolbarModule,
    TableModule,
    DynamicDialogModule,
    RadioButtonModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService, DialogService],
  bootstrap: [],
  exports: [
    ButtonModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    SelectButtonModule,
    ToolbarModule,
    TableModule,
    DynamicDialogModule,
    RadioButtonModule,
    ConfirmDialogModule,
  ],
  schemas: [],
})
export class PrimeNgModule {}
