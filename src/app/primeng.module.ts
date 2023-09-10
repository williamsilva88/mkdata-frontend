import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
  ],
  providers: [MessageService],
  bootstrap: [],
  exports: [
    ButtonModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
  ],
  schemas: [],
})
export class PrimeNgModule {}
