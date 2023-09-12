import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { LoadingModule } from './components/core/loading/loading.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgxsModule.forRoot([]),
    LoadingModule,
    NgxMaskModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [LoadingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
